document.getElementById("inp3").addEventListener("change",(e)=>{
  val1 = document.getElementById("inp2").value
  val2 = e.target.value
  if(val1 == val2 && val1 != "" )
  {
    document.getElementById("alert").innerHTML = "Password matched ✅"
    document.getElementById("alert").style.color = "#00D26A"
  }
  else{
    document.getElementById("alert").innerHTML = "Confirm password not is wrong ❌"
  }
})

document.getElementById("eyebtn").addEventListener("click",(e)=>{
val1 = document.getElementById("inp2")
val2 = document.getElementById("inp3")
if(val2.type == 'password'){
    val1.type = 'text'
    val2.type = 'text'
        document.getElementById("eyebtn").innerHTML = 'Show Password🫣'
    
}
else{
    val1.type = 'password'
    val2.type = 'password'
    
    document.getElementById("eyebtn").innerHTML = 'Hide password 😌'
}
})