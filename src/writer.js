export const write = (tag_id, content) => {
    if( tag_id === "sledDisplayId"){
      let previousText = document.getElementById(tag_id).textContent;
      document.getElementById(tag_id).innerText = previousText + content 
 }else{
  document.getElementById(tag_id).innerText =  content
 }
}

export default write