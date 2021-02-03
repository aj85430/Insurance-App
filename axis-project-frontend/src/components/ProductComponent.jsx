import React, { Component, Fragment } from 'react';
import { getFormConfig } from '../Configs/FormConfig';
import { getPartnerConfig } from '../Configs/PartnerConfig';
import DyanamicFormField from '../DyanamicComponents/DyanamicFormField';
import { setForm } from "../actions/FormAction";
import { connect } from 'react-redux';
import QuoteComponent from '../DyanamicComponents/QuoteComponent';
import CardGroup from 'react-bootstrap/CardGroup'
import 'semantic-ui-css/semantic.min.css'
import { Button, Progress } from 'semantic-ui-react'

var quotePremium = []
var formFields=null
var partnerFields=null

function sortByProperty(property, asc) {
    if (asc === 0) {
        return function (a, b) {
            if (a[property] > b[property])
                return 1;
            else if (a[property] < b[property])
                return -1;

            return 0;
        }
    } else {
        return function (a, b) {
            if (a[property] > b[property])
                return -1;
            else if (a[property] < b[property])
                return 1;

            return 0;
        }
    }
}

class ProductComponent extends Component {

    /* setValues = (e) => {
        this.props.setForm(e.target.name,e.target.value)
        this.setState((prevState, props) => ({
            userDetails: {
                ...prevState.userDetails,
                [e.target.name] : e.target.value
            },
        }));
    } */

    componentDidMount(){
        this.setState({maxFormFieldPosition: Math.max.apply(Math, formFields.map(function(field){
            return field.fieldPosition
        }))})
    }

    state = {
        page: "formPage",
        filterPartnerData: "All",
        sortquotePremium: "None",
        quoteOrder: [],
        currentFieldPosition: 1,
        maxFormFieldPosition: 1,
        percent: 0,
        formFields : getFormConfig(this.props.config.productID)[0].fields,
        partnerFields : getPartnerConfig(this.props.config.productID)
    }

    increment = () =>
    this.setState((prevState) => ({
      percent: prevState.percent === 100 ? 0 : prevState.percent + ((this.state.currentFieldPosition)*100/this.state.maxFormFieldPosition),
    }))

    setquotePremium = (partnerID, premium) => {
        quotePremium.push({
            partnerID: partnerID,
            premium: premium
        })
    }

    sortquotePremium = (e) => {
        if (e.target.value === "Low-to-High") {
            quotePremium.sort(sortByProperty("premium", 0));
        } else if (e.target.value === "High-to-Low") {
            quotePremium.sort(sortByProperty("premium", 1));
        }
        console.log(quotePremium)
        this.setState({
            sortquotePremium: e.target.value,
            quoteOrder: quotePremium
        })
    }

    render() {
        /* Dyanamically fetch the form config based on product */
        /* formFields = getFormConfig(this.props.config.productID)[0].fields; */
        /* formFields = getFormConfig(this.props.config.productID); */
        /* console.log(formFields) */
        /* Dyanamically fetch the Partner config based on product */
       /*  partnerFields = getPartnerConfig(this.props.config.productID);
        console.log(partnerFields) */
        
        formFields = this.state.formFields
        partnerFields = this.state.partnerFields

        { document.getElementsByTagName("body")[0].style.backgroundImage = `url(${this.props.config.backgroundImage})` }
        /* const divStyle = {
            width: '120%',
            height: '700px',
            backgroundImage: `url(${this.props.config.backgroundImage})`,
            backgroundSize: 'cover'
        }; */
        return (
            (
                this.state.page === 'formPage') ?
                <div className="container my-5 mx-3" /* style={divStyle} */>
                    <form onSubmit={(e) => {
                            e.preventDefault();
                            var flag = true;
                            var progressFlag = false;
                            formFields = formFields.filter(field => 
                                field.fieldPosition===this.state.currentFieldPos
                            )

                            formFields.forEach(field => {
                                if (field.validation !== undefined) {
                                    if (!eval(field.validation.func)(e.target[field.name].value)) {
                                        flag = false;
                                    }
                                }   
                            })

                            if(this.state.currentFieldPosition==this.state.maxFormFieldPosition)
                            {
                                progressFlag=true;
                            }
                            else{
                                this.setState({ currentFieldPosition:  this.state.currentFieldPosition+1})
                                this.increment();
                            }
                                
                            if (flag && progressFlag) { this.setState({ page: "QuotePage" }); }
                        }}>
                            <div>
                            <Progress percent={this.state.percent} indicating />
                            </div>

                            <h3 style={{ alignItems: 'center' }}>{this.props.config.title}</h3>
                        <hr />
                        {
                            formFields.filter(field => 
                                field.fieldPosition==this.state.currentFieldPosition
                            ).map(field => {
                                return (
                                    <>
                                    <DyanamicFormField
                                        key={field.id}
                                        field={field}
                                        formHandleProps={this.props}
                                    />
                                    </>
                                )
                            })  
                        }
                        {
                            (this.state.currentFieldPosition!==this.state.maxFormFieldPosition)?
                            <input type="submit" className="btn my-2 py-2" style={{width : '100%' ,color : "white" , backgroundColor : "#ae275f"}} value="NEXT"/>:
                            // <button type="submit">Next</button> :
                             <>
                             </>
                        }
                    </form>
                </div> :
                <div className="container">
                    <div className="mx-1 my-1">
                        <div className="row my-2 py-2" style={{ backgroundColor: "white", width: "84%" }}>
                            <div className="col-6">
                                <label>Filter by Partner</label>
                                <select className="form-control" id="filterByPartner" onChange={(e) => {
                                    this.setState({ filterPartnerData: e.target.value })
                                }}>
                                    <option>All</option>
                                    {
                                        partnerFields.map(partner => {
                                            return (
                                                <option>{partner.partnerName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <label>Sort by Price</label>
                                <select className="form-control" id="sortByPremium" onChange={this.sortquotePremium}>
                                    <option>None</option>
                                    <option>Low-to-High</option>
                                    <option>High-to-Low</option>
                                </select>
                            </div>
                        </div>
                        {/* {
                            partnerFields.map(partnerField => {
                                if (this.state.filterPartnerData === 'All' || this.state.filterPartnerData === partnerField.partnerName) {
                                    if (this.state.sortquotePremium === 'None') {
                                        return (
                                            <div style={{ width: "20%" }} className="mx-2 my-2">
                                                <QuoteComponent config={partnerField} productID={this.props.config.productID} setquotePremium={this.setquotePremium} />
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            this.state.quoteOrder.map(quotePremium => {
                                                if (quotePremium.partnerID === partnerField.partnerID) {
                                                    return (
                                                        <div style={{ width: "20%" }} className="mx-2 my-2">
                                                            <QuoteComponent config={partnerField} productID={this.props.config.productID} />
                                                        </div>
                                                    )
                                                }
                                            })
                                        )
                                    }
                                }
                            })
                        } */}

                        {
                            this.state.quoteOrder.length!==0 ?
                                this.state.quoteOrder.map(quotePremium => {
                                    console.log("Done 1")
                                    return (
                                        partnerFields.map(partnerField => {
                                            if (this.state.filterPartnerData === 'All' || this.state.filterPartnerData === partnerField.partnerName) {
                                                if (quotePremium.partnerID === partnerField.partnerID) {
                                                    return (
                                                        <div style={{ width: "20%" }} className="mx-2 my-2">
                                                            <QuoteComponent config={partnerField} productID={this.props.config.productID} />
                                                        </div>
                                                    )
                                                }
                                            }
                                        })
                                    )
                                })
                                :
                                <div>
                                    {
                                        partnerFields.map(partnerField => {
                                            if (this.state.filterPartnerData === 'All' || this.state.filterPartnerData === partnerField.partnerName) {
                                                return (
                                                    <div style={{ width: "20%" }} className="mx-2 my-2">
                                                        <QuoteComponent config={partnerField} productID={this.props.config.productID} setquotePremium={this.setquotePremium} />
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                        }
                    </div>
                </div>
        )
    }
}

const mapStatetoProps = state => (
    {
        /* fullName: state.form.fullName,
        email: state.form.email,
        phone: state.form.phone */
    }
)

export default connect(mapStatetoProps, { setForm })(ProductComponent);
/* export default ProductComponent; */