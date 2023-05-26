require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const express = require("express");
const router = express.Router();

router.post("/create-checkout-session", async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            line_items: req.body.items.map(item => {
                return{
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name: item.title
                        },
                        unit_amount: (item.price)*100,

                    },
                    quantity: 1
                }
            }),
            success_url: 'https://jtgeatsfoodapp.netlify.app/success',
            cancel_url: 'https://jtgeatsfoodapp.netlify.app/fail'
        })

        res.json({url: session.url})

    }catch(e){
     res.status(500).json({error:e.message})
    }
})
module.exports = router