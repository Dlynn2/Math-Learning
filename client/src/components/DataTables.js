import React, { Component } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios'
class DataTables extends Component {
    constructor() {
        super()
        this.state = {
            survey_data: [],
            header :[]
        }
    }



    componentDidMount() {
        axios.get('users/DataTables')
            .then(res => {
                this.setState({ survey_data: res.data })
                this.setState({header : Object.keys(this.state.survey_data[0])})
            })
    }


    renderTableHeader() {
        let headerTest = {}
         headerTest = this.state.header
        return headerTest.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }

    renderTableData() {
        return this.state.survey_data.map((survies, index) => {
            const { UserID, ClassID, Engagement, Interest, Enjoyment, Challenge, Skill,Timestamp } = survies //destructuring
            return (
                <tr key={UserID}>
                    <td>{ClassID}</td>
                    <td>{Engagement}</td>
                    <td>{Interest}</td>
                    <td>{Enjoyment}</td>
                    <td>{Challenge}</td>
                    <td>{Skill}</td>
                    <td>{Timestamp}</td>
                </tr>
            )
        })
    }

    render() {


        return (
            <div>
                <Table  striped hover bordered id='survey answers'>
                    <thead>
                        <tr>
                            {this.renderTableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default DataTables