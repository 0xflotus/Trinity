

function parseExtract (string: string) {

// Array for storing the Queries inside the string
let array: Array<string> = [];

// Find queries inside of string, push them on to array
  const findQuery = (string: string) => {

    // find the location of trinity in the string
    const tlocation: number = string.search('Trinity');

    // if 0, Trinity hasn't been typed into the string
    if (tlocation !== -1){
      // Create new string, which will be result of slicing from 'T' in Trinity
      let newString: string = string.slice(tlocation, string.length);


      //Create new variable for the query and end location
      //extract(newString) returns an array
      let queryNLocation: Array<any> = extract(newString);

      // push the query onto the main array
      array.push(queryNLocation[0]);


      // recursively call the function find Query on the new string based on the location 
      let remainingString: string = newString.slice(queryNLocation[1]+1);
   
      // recursively call the function on the new string
      findQuery(remainingString);


    } else {
      return
    }
  };

  //passing newString in to extract
  const extract = (string: string) => {
 

    //variable for queryString
    let queryString: any = '';

    // extract the query
    let count: number = 9;
    let stack: Array<any> = [];
    stack.push(string[8]);
    while(stack.length !== 0){
      
      switch(string[count]){
        case '[': 
        case '(':
        case '{':
          stack.push(string[count]);
          queryString += string[count];
        break;
        case ']':
          if (stack.pop() !== '['){
            queryString = false
          } else {
            queryString += string[count];
          }
          break;
        case ')':
          if(stack.pop() !== '('){
            queryString = false
          } else {
            queryString += string[count];
          }          break;
        case '}':
          if(stack.pop() !== '{'){
            queryString = false
          } else {
            queryString += string[count];
          }
          break;
        case "\"" :
        case "\`" :
        case "\'":
          let newPop: any = stack.pop();
          if( newPop === '\"' || newPop === '\'' || newPop === '\`' ){
            break;
          } else {
            queryString = false
            stack = []
          } 
          break;
        default:
          queryString += string[count];
      }

      count+=1;

    }
    // find the location of the end of the query
    // returns an array of the query and the location of the end of the query
    return [queryString, count+1];
  };

  findQuery(string);

return array;

}



module.exports = parseExtract