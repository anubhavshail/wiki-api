const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikidb");

const articleschema = mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("Article", articleschema);

app.get("/", function(req,res){

})

app.route("/articles")
    .get((req, res) => {
        Article.find({}).then(function(lists){
            res.send(lists);
        })
        .catch(function(err){
            res.send(err);
        })
    })
    .post((req, res) => {
        const list = new Article({
            title: req.body.title,
            content: req.body.content
        })
        list.save().then(function(){
            res.send("Successful");
        })
        .catch(function(err){
            res.send(err);
        })
    })
    .delete((req, res) => {
        Article.deleteMany({}).then(function(){
            res.send("Successful");
        })
        .catch(function(err){
            res.send(err);
        })
    });

app.route("/articles/:topic")
    .get((req, res) => {
        Article.findOne({title: req.params.topic}).then(function(list){
            res.send(list);
        })
        .catch(function(err){
            res.send(err);
        })
    })
    .put((req, res) => {
        Article.updateOne({title: req.params.topic}, {title: req.body.title, content: req.body.content}).then(function(){
            res.send("Successful");
        })
        .catch(function(err){
            res.send(err);
        })
    })
    .patch((req, res) => {
        Article.updateOne({title: req.params.topic}, {$set: req.body}).then(() => {
            res.send("Successful");
        })
        .catch((err) => {
            res.send(err);
        })
    })
    .delete((req, res) => {
        Article.deleteOne({title: req.params.topic}).then(()=>{
            res.send("Successful");
        })
        .catch((err)=>{
            res.send(err);
        })
    });

app.listen(3000, function(req, res){
    console.log("server is running on port 3000");
})
