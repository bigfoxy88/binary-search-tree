function Node(data){
    
    let left=null;
    let right=null;
    return {data,left,right}
}
class Tree{
    constructor(arr){
        this.root=buildTree(arr)
    }
    //INSERT OPERATION
    insert=(value)=>{

        function searchForLeaf(r){
          if(value<r.data){
             if(r.left===null){
               r.left=Node(value)
               return
             }
             return searchForLeaf(r.left)
           
           }else{
             if(r.right===null){
               r.right=Node(value)
               return 
             }
            return  searchForLeaf(r.right)
           }
         }
         return searchForLeaf(this.root)
     }

     //delete operation
     deleteItem(value){

        const searchForValue=(r)=>{
  
          //dealing with childless leaves
          if(r.left!==null){
              if(r.left.data===value){
                if(r.left.left===null&&r.left.right===null){
                  r.left=null
                  return;
                }
              }
           }
          if(r.right!==null){
            if(r.right.data===value){
              if(r.right.left===null&&r.right.right===null){
                r.right=null
                return;
              }
          }
        }
  
  
        //dealing with a leaf with oneChild
        if(r.left!==null){
          if(r.left.data===value){
            if(r.left.left!==null&&r.left.right===null){
              r.left=r.left.left
              return;
            }else if(r.left.right!==null&&r.left.left===null){
              r.left=r.left.right
              return ;
            }
  
          }
        }
  
        if(r.right!==null){
          if(r.right.data===value){
            if(r.right.left!==null&&r.right.right===null){
              r.right=r.right.left
              return;
            }else if(r.right.right!==null&&r.right.left===null){
              r.right=r.right.right
              return ;
            }
          }
        }
  
        //DEALING WITH A NODE THAT HAS TWO CHILDREN
  
        if(r.left!==null){
          if(r.left.data===value){
            if(r.left.left!==null&&r.left.right!==null){
              let temp;
              for(let i=r.left.right;i!=null;i=i.left){
                 if(i.left===null){
                  this.deleteItem(i.data)
                  r.left.data=i.data
                 return
                 }
              }
  
            }
          }
        }
        if(r.right!==null){
          if(r.right.data===value){
            if(r.right.left!==null&&r.right.right!==null){
              //let temp=r.right.right
              for(let i=r.right.right;i!=null;i=i.left){
               
                 if(i.left===null){
                  this.deleteItem(i.data)
                  r.right.data=i.data
                  return
                }
              }
  
            }
          }
        }
        //deals with removing root node
        if(r.data===value){
          for(let i=r.right;i!=null;i=i.left){
               
            if(i.left===null){
             this.deleteItem(i.data)
             r.data=i.data
             return
           }
          }
        }
  
  
        if(r.data>value){
              return searchForValue(r.left)
          }else{
            return searchForValue(r.right)
  
          }
        }
        console.log(this.root)
        return searchForValue(this.root)
      }
    

     //FIND VALUE FUNCTION 

      find(value){
      
        function search(r){
          
          if(r.data===value){
            return r
          }
          if(value<r.data){
            return search(r.left)
  
          }else{
            return search(r.right)
  
          }
        }
        return search(this.root)
      }
  
      //BREADTH-FIRST TRAVERSAL  FUNCTION
  
       levelOrder(callback){
  
        function traverseTree(r){
          if(r===null)return 
          let queue=[];
          queue.push(r)
          let newArr=[]
          while(queue.length!==0){
            let current=queue.shift()
            if(callback===undefined){
              newArr.push(current.data)
            }else{
              callback(current.data) 
            }
            if(current.left!==null)queue.push(current.left);
            if(current.right!==null)queue.push(current.right);
            
            //console.log(queue)
          }
          if(callback===undefined){return newArr}
        }
        return traverseTree(this.root)
      }
  
      //DEPTH FIRST TRAVERSAL FUNCTIONS
  
       preOrder(callback){
        let newArr=[];
        function preOrderTraverse(r){
          if(r===null)return
          if(callback===undefined){
            newArr.push(r.data);
            preOrderTraverse(r.left)
            preOrderTraverse(r.right)
          }else{
            callback(r.data)
            preOrderTraverse(r.left)
            preOrderTraverse(r.right)
          }
          if(callback===undefined)return newArr
        }
        return preOrderTraverse(this.root)
      }
  
       inOrder=(callback)=>{
        let newArr=[];
        function inOrderTraverse(r){
          if(r===null)return 
          if(callback===undefined){
            inOrderTraverse(r.left)
            newArr.push(r.data);
            inOrderTraverse(r.right)
          }else{
            inOrderTraverse(r.left)
            callback(r.data)
            inOrderTraverse(r.right)
          }
          if(callback===undefined)return newArr
        }
        return inOrderTraverse(this.root)
      }
  
       postOrder(callback){
        let newArr=[];
        function postOrderTraverse(r){
          if(r===null)return 
          if(callback===undefined){
            postOrderTraverse(r.left)
            postOrderTraverse(r.right)
            newArr.push(r.data);
          }else{
            postOrderTraverse(r.left)
            postOrderTraverse(r.right) 
            callback(r.data)
          }
          if(callback===undefined)return newArr
        }
        return postOrderTraverse(this.root)
      }
  
      //FUNCTION TO FIND HEIGHT OF TREE
     height=(node,h=0)=>{
        
        if(node===null)return h-1
        let hl=this.height(node.left,h+1);
        let hr=this.height(node.right,h+1);
        return hl>hr?hl:hr
      }

  
       depth(node){
          let d=0
          function findDepth(r){
            if(node.data===r.data)return 0
            if(node.data<r.data){
              return 1+findDepth(r.left)
            }else{
              return 1+findDepth(r.right)
            }
            
          }
          return findDepth(this.root)
      }
       isBalanced(){
        
        
        let leftHeight=this.height(this.root.left)
        let rightHeight=this.height(this.root.right)
        //console.log(leftHeight,rightHeight)
        if(Math.max(leftHeight,rightHeight)-Math.min(leftHeight,rightHeight)<=1){
          return true 
        }else{
          
          return false
        }
  
      }
  
       reBalance(){
        //console.log(isBalanced())
       
          let newArr=this.inOrder()
          this.root=buildTree(newArr)
  
      
        
  
      }
    
}



function buildTree(array){
    let newArr=array.filter((item,index)=>array.indexOf(item)===index)
   
    let sortedArr=newArr.sort((a,b)=>{return a-b}) 
    //console.log(sortedArr)
    function buildBalancedTree(arr){
         let start=0
        let end=arr.length-1
        if(start>end)return null
        let mid=Math.floor((start+end)/2)
        let root=Node(arr[mid])
        root.left=buildBalancedTree(arr.slice(start,mid))
        root.right=buildBalancedTree(arr.slice(mid+1,end+1))
        return root
    }    
    return buildBalancedTree(sortedArr)

   
}

function randomArrayGenerator(){
  let newArr=[]
  for(let i=0;i<12;i++){
    let randomNum=Math.floor(Math.random()*100)
    newArr.push(randomNum)
  }
  return newArr
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
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
  let arrForTree=randomArrayGenerator()
  let tree2=new Tree(arrForTree)
  tree2.levelOrder((x=>{console.log(x)}))
  console.log()
  tree2.preOrder((x=>{console.log(x)}))
  console.log()
  tree2.inOrder((x=>{console.log(x)}))
  console.log()
  tree2.postOrder((x=>{console.log(x)}))
  tree2.insert(105)
  tree2.insert(366)
  tree2.insert(420)
  tree2.insert(300)
  console.log(tree2.isBalanced())
  tree2.reBalance()
  console.log(tree2.isBalanced())
  tree2.levelOrder((x=>{console.log(x)}))
  console.log()
  tree2.preOrder((x=>{console.log(x)}))
  console.log()
  tree2.inOrder((x=>{console.log(x)}))
  console.log()
  tree2.postOrder((x=>{console.log(x)}))

 prettyPrint(tree2.root)



 