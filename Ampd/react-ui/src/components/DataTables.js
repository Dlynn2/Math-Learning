import React, { Component } from 'react'
import { CSVLink } from 'react-csv'
import axios from 'axios'
import { addAdmin, getDataTable, isClassNow, getCurrentClass, getSubscription, setSubscription, getSubscriptionsFor } from './UserFunctions'
import { Table } from 'reactstrap'
import "./css/Profile.css"
import logo_grey from "./images/logo_update_grey.png";

class DataTables extends Component {
	constructor() {
		super()
		this.state = {
			survey_data: [],
			header: []
		}
	}
	respData = ''

	async getTable() {
		this.respData = await getDataTable(0)
		this.count = this.respData.data.length-5
		this.displayData = this.respData.data.slice(this.count)
		this.setState(this.respData.data)
		console.log(this.state)
	}

	async componentDidMount() {
		//get datatable
		await this.getTable()
		this.setState({ survey_data: this.displayData })
		this.setState({ header: Object.keys(this.state.survey_data[0]) })
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
			const { RecordedDate, Q1_1, Q1_2, Q1_3, Q1_4, Q1_5, ClassID, StartTime, EndTime, ObsID } = survies //destructuring
				return (
					<tr key={RecordedDate}>
						<td>{RecordedDate}</td>
						<td>{Q1_1}</td>
						<td>{Q1_2}</td>
						<td>{Q1_3}</td>
						<td>{Q1_4}</td>
						<td>{Q1_5}</td>
						<td>{ClassID}</td>
                    				<td>{StartTime}</td>
                    				<td>{EndTime}</td>
						<td>{ObsID}</td>
					</tr>
					)
				})
			}
	render() {
		return (
			<div>
				{this.respData.data ?
					<p><CSVLink
						data={this.respData.data}
						filename={'ampdTable.csv'}>Download</ CSVLink> Entire Table As CSV</p>
					: <p>Download Entire Table As CSV</p>}
				<div>
					<Table striped hover bordered id='survey answers'>
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
				<div>
					<p>{this.count} more entries</p>
				</div>
				<footer class="site-footer">
		      <div class="container">
		        <div class="row">
		          <div>
		            <img src={logo_grey} alt="AMP'd Engagement"></img>
		          </div>
		          <div class="col-sm-12 col-md-6">
		          </div>
		          <div class="col-xs-6 col-md-3">
		            <h6>Quick Links</h6>
		            <ul class="footer-links">
		              <li><a href="/profile">Home</a></li>
		              <li><a href="/faq">F.A.Q.</a></li>
		            </ul>
		          </div>
		        </div>
		      </div>
		</footer>
			</div>
		)
	}
}

export default DataTables
