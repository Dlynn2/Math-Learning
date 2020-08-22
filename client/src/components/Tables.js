const Tables{
    constructor(props) {
       super(props)
       this.state = {
          students: [
             { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
             { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
             { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
             { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
          ]
       }
    }
 
    renderTableHeader() {
       let header = Object.keys(this.state.students[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
 
 
       return (
          <div>
             <h1 id='title'>React Dynamic Table</h1>
             <table id='students'>
                <tbody>
                   <tr>{this.renderTableHeader()}</tr>
                   {this.renderTableData()}
                </tbody>
             </table>
          </div>
       )



 renderTableHeader() {
        console.log((this.state.classes[0]))
            // return <th key={key}>{key}</th>
    // })

    //  for(var i =0; i < this.state.headers.length; i++){
    //      header.push(<th key={this.state.headers[i]}>{this.state.headers[i]}</th>)
    // 
}