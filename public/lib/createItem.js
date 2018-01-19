let id=0;
const createItem=function(){
  let br=document.createElement('br');
  let form=document.querySelector('form');
  let input=document.createElement('input');
  input.name=++id;
  input.type='text';
  form.appendChild(input);
  form.appendChild(br);
}
