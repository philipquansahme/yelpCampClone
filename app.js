var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//SCHEMA SETUP
var campgroundSchema = new mongoose.connect({
    name: String,
    image: String
});
//MODELS
var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
    name: "Bawku", 
    image: "http://1.bp.blogspot.com/_C5qwnWVsx_U/R_I9je_H7lI/AAAAAAAAAD8/ImXYsZI8M-M/s400/kusasi+house.jpg"

}, function(err, campground){
    if(err){
        console.log(err)
    }else{
        consple.log("NEW DB...!!")
        console.log(campground)
    }

});

//Data Array
var campgrounds = [
    {name: "Bawku", image: "http://1.bp.blogspot.com/_C5qwnWVsx_U/R_I9je_H7lI/AAAAAAAAAD8/ImXYsZI8M-M/s400/kusasi+house.jpg"},
    {name: "Damago", image: "https://ghanawebonline.com/wp-content/uploads/2019/02/DAMANGO-MOSQUE-696x462-696x405.jpg"}, 
    {name: "WaleWale", image: "https://i0.wp.com/www.ghpage.com/wp-content/uploads/2017/12/Damango-shs.jpg"}
 ];

//Routes
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds : campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name : name, image : image};
    campgrounds.push(newCampGround);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("*", function(req, res){
    res.send("Error 404: Page Not Found!!");
});

//Server Listen
app.listen(3000, function(){
    console.log("Server Started");
});