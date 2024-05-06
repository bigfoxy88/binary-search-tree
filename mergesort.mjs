export default function mergeSort(arr){
    if(arr.length==1){
        return arr
    }
    let sorted=[]
    let arr1=mergeSort(arr.slice(0,Math.floor((arr.length)/2)))
    let arr2=mergeSort(arr.slice(Math.floor((arr.length)/2),arr.length))

    
    return merge(arr1,arr2)
    
}

export function merge(arr1,arr2){

    let combined=[];
    let i=0;
    let j=0;
    while(i<arr1.length&&j<arr2.length){
        if(arr1[i]<arr2[j]){
            combined.push(arr1[i])
            i++
        }else{
            combined.push(arr2[j])
            j++
        }
    }
    while(i<arr1.length){
        combined.push(arr1[i])
        i++
    }
    while(j<arr2.length){
        combined.push(arr2[j])
        j++
    }
   return combined
}


export const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

//console.log(mergeSort([3,2,1,13,8,5,0,1]))