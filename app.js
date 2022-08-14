const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const ejs=require('ejs');
var _ = require('lodash');

const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/StudentRegistry', {useNewUrlParser: true});

const studentSchema={
    name: String,
    rollno: Number,
    branch: String,
    userID: String,
}
const Student=mongoose.model('Student', studentSchema);

app.get('/', (req, res)=>{
    Student.find({}, (err, foundStudents)=>{
        if(err){
            console.log(err);
        }else{
            res.render('home', {students: foundStudents});
        }
    })
    
} );

app.get('/add', (req, res)=>{
    res.render('add');
}
);

app.get('/update/:id', (req, res)=>{
    Student.findOne({_id: req.params.id}, (err, foundStudent)=>{
        if(err){
            console.log(err);
        }else{
            res.render('update', {student: foundStudent});
        }
    } );
}
);

app.get('/delete/:id', (req, res)=>{
    Student.deleteOne({_id: req.params.id}, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    } );
}
);

app.post('/add', (req, res)=>{
    const student=new Student({
        name: req.body.name,
        rollno: req.body.rollno,
        branch: req.body.branch,
        userID: req.body.userID
    });

    student.save();
    res.redirect('/');
}
);

app.post('/update/:id', (req, res)=>{
    Student.updateOne({_id: req.params.id}, {$set: {name: req.body.name, rollno: req.body.rollno, branch: req.body.branch, userID: req.body.userID}}, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    } );
}
);


app.get('/view', (req, res)=>{
    Student.find({}, (err, foundStudents)=>{
        if(err){
            console.log(err);
        }else{
            res.render('view', {students: foundStudents});
        }
    } );
});

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
});