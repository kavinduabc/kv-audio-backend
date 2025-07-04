import Order from "../models/order.js";
import Product from "../models/product.js";
import { isItCustomer,isTtAdmin } from "./userController.js";


export  async function createOrder(req,res){
  
    const data = req.body;
    const orderInfo = {
        
        orderedItems : []
    }
    
    if(req.user == null){
       
        res.status(401).json({
            message : "Please login and try again"
        })
        return 
    }
    orderInfo.email = req.user.email;

    const lastOrder = await Order.find().sort({orderDate:-1}).limit(1);
    if(lastOrder.length == 0){
        orderInfo.orderId = "ORD0001";
    }
    else{
        const lastOrderId = lastOrder[0].orderId;
        const lastOrderNumberInString = lastOrderId.replace("ORD","");
        const lastOrderNumber = parseInt(lastOrderNumberInString);
        const currentOrderNumber = lastOrderNumber + 1;
        const formetedNumber = String(currentOrderNumber).padStart(4,'0');   

        orderInfo.orderId = "ORD" + formetedNumber;
    }

    let onDayCost = 0;
  
 //** find the order body included items  */

    for(let i=0; i<data.orderedItems.length ; i++)
    {
        try {
           const product = await Product.findOne({key : data.orderedItems[i].key})
           if(product == null){
            res.status(404).json({
                message:"Product with key "+data.orderedItems[i].key+" not found"
            })
            return 
           } 

           if(product.availability == false){
            res.status(400).json({
                message : "product with key "+data.orderedItems[i].key+" is not available"
            })
            return 
           }

           orderInfo.orderedItems.push({
            product : {
                key : product.key,
                name : product.name,
                image : product.image[0],
                price : product.price
            },
            quantity : data.orderedItems[i].quantity
           })

           onDayCost += product.price * data.orderedItems[i].quantity;

        } catch (e) {
            res.status(500).json({
                message : "Failed to create order"
            })
            return 
        }
    }

    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate;
    orderInfo.totalPrice = onDayCost * data.days;
   

    try{
        const newOrder = new Order(orderInfo);
        const result =await newOrder.save();
        res.json({
            message : "Order created successfully",
            order : result
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
        
            message : "Failed to create order"
        })
    }

}

export async function getQuotetion(req,res) {
    
    const data = req.body;
    const orderInfo = {
        
        orderedItems : []
    };
    

    let onDayCost = 0;
  
 //** find the order body included items  */

    for(let i=0; i<data.orderedItems.length ; i++)
    {
        try {
           const product = await Product.findOne({key : data.orderedItems[i].key})
           if(product == null){
            res.status(404).json({
                message:"Product with key "+data.orderedItems[i].key+" not found"
            })
            return 
           } 

           if(product.availability == false){
            res.status(400).json({
                message : "product with key "+data.orderedItems[i].key+" is not available"
            })
            return 
           }

           orderInfo.orderedItems.push({
            product : {
                key : product.key,
                name : product.name,
                image : product.image[0],
                price : product.price
            },
            quantity : data.orderedItems[i].quantity
           })

           onDayCost += product.price * data.orderedItems[i].quantity;

        } catch (e) {
            res.status(500).json({
                message : "Failed to create order"
            })
            return 
        }
    }

    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate;
    orderInfo.totalPrice = onDayCost * data.days;
   

    try{
        const newOrder = new Order(orderInfo);
        
        res.json({
            message : "Order created successfully",
            total : orderInfo.totalPrice ,
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
        
            message : "Failed to create order"
        })
    }
}


    export async function getOrders(req,res){

        if(isItCustomer(req)){
            try{
                const orders = await Order.find({email: req.user.email});
                res.json(orders);
            }catch(e){
                res.status(500).json({error: "Failed to get orders"});
            }
        }else if(isTtAdmin(req)){
            try{
                const orders = await Order.find();
                res.json(orders);
            }catch(e){
                res.status(500).json({error: "Failed to get orders"});
            }
        }else{
            res.status(403).json({error: "Unauthorized"});
        }
    }

    export async function approveOrRejectOrder(req,res){
        const orderId = req.params.orderId;
        const status = req.body.status;
    
        if(isTtAdmin(req)){
            try{
                const order = await Order.findOne(
                    {
                        orderId: orderId
                    }
                )
    
                if(order == null){
                    res.status(404).json({error: "Order not found"});
                    return;
                }
    
                await Order.updateOne(
                    {
                        orderId: orderId
                    },
                    {
                        status: status
                    }
                );
    
                res.json({message: "Order approved/rejected successfully"});
    
            }catch(e){
                res.status(500).json({error: "Failed to get order"});
            }
        }else{
            res.status(403).json({error: "Unauthorized"});
        }
    }

export function TotalOrderCount(req, res) {
  if (!isTtAdmin(req)) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  Promise.all([
    Order.countDocuments(), 
    Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, 
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, 
    ]),
  ])
    .then(([totalOrders, monthlyResults]) => {
      const monthlyOrders = Array(12).fill(0);
      monthlyResults.forEach((r) => {
        monthlyOrders[r._id - 1] = r.count; 
      });

      res.json({
        totalOrders,
        monthlyOrders,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "Failed to get order count",
      });
    });
}
