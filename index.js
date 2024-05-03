express=require('express')
app=express()
port=3000
student=require('./database.js')
app.listen(port,()=>{console.log('server runing')})


app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extends:true}));

app.get('/',async(req,res)=>{
  res.render('index.ejs')
})
app.get('/login',(req,res)=>{
  res.render('adminlogin.ejs')
})

const adminUsername = 'admin';
const adminPassword = 'admin123';

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === adminUsername && password === adminPassword) {
  
      res.render('admin');
  } else {
      res.status(401).send('Invalid username or password.');
  }
});



app.get('/admin',async(req,res)=>{
    students=await student.find()
    res.render('admin.ejs', {
        title:"Read Update and Delete opereation",
        students:students})
})





app.post('/register',async(req,res)=>{
    const {name,mail,phone,address,department,salary,gender}=req.body;
    newstudent=new student({
        name,mail,phone,address,department,salary,gender 
    })
    studentsave=await newstudent.save()
    res.redirect('admin')
})

app.get('/register',async(req,res)=>{
  students=await student.find()
    res.render('register.ejs',{
    title:"Read Update and Delete opereation",})
})

app.get('/delete/:id',async(req,res)=>{
  const {id}=req.params
   deleteStudent=await student.findByIdAndDelete(req.params.id)
   res.redirect('/admin')
 })

app.get('/edit/:id',async(req,res)=>{
  id=req.params.id
  editstudent=await student.findById({_id:id})
  if(editstudent==null){res.redirect('/admin')}
  else{res.render('edit.ejs',{students:editstudent})}
  
})

app.post('/edit/:id',async(req,res)=>{
  id=req.params.id
  const {name,mail,age}=req.body
  updatestudent=await student.findByIdAndUpdate({_id:id},
  {name,mail,age},{new:true})
  res.redirect('/admin')
})

app.get('/home',async(req,res)=>{
  students=await student.find()
    res.render('admin.ejs',{
      title:"Read Update and Delete opereation",
    })
})

///////////////////about///////////////

app.get('/about',async(req,res)=>{
  res.render('about.ejs')
})

app.get('/contact',async(req,res)=>{
  res.render('contact.ejs')
})