import React, { Component } from 'react';

class DyanamicFormField extends Component {
    render() {
        console.log(this.props.field.label)
        const Component = `${this.props.field.htmlType}`;
        const {htmlType , fieldID , fieldPosition , validation , ...fieldProps} = this.props.field ;
        const setValidation = (status,spanElement,message)=>{
            if(status === null){
                document.getElementById(spanElement).innerHTML = message ;
            }
            else{
                document.getElementById(spanElement).innerHTML = "" ;
            }
        }
        var renderElement ;
        if(this.props.field.htmlType === 'input' )
        {
            if(this.props.field.type === ('radio' || 'checkbox'))
            {
                renderElement = (
                <div>
                <Component {...fieldProps} onChange={(e) => {this.props.formHandleProps.setForm(e.target.name,e.target.value)}} value={this.props.formHandleProps[this.props.field.name]}/> 
                <label className="form-check-label">{this.props.field.radio_label}</label>
                </div>
                );
            }
            else if(this.props.field.type === 'submit'){
                renderElement = <Component {...fieldProps} onChange={(e) => {this.props.formHandleProps.setForm(e.target.name,e.target.value)}}/> ;
            }
            else{
                renderElement = <Component {...fieldProps} onChange={(e) => {
                    if(validation !== undefined){
                        /* console.log(validationFunc) */
                        setValidation(eval(validation.func)(e.target.value) , "span_" + this.props.field.id , validation.message)
                    }
                    this.props.formHandleProps.setForm(e.target.name,e.target.value)}
                } value={this.props.formHandleProps[this.props.field.name]}/> ;
            }
        }
        else if(this.props.field.htmlType === 'select')
        {
            const {options , ...props} = this.props.field
            renderElement = (
            <Component {...props} onChange={(e) => {this.props.formHandleProps.setForm(e.target.name,e.target.value)}} value={this.props.formHandleProps[this.props.field.name]}> 
            {
                options.map((option)=>{
                    return <option>{option}</option>
                })
            }
            </Component>
            ) ;
        }
        return (
            <div className="form-field">
                {/*  1.Label */}
                {
                    (this.props.field.label !== undefined) &&
                    <label>{this.props.field.label}</label>
                }
                
                {/* 2A.Input Tag / 2B.Select Tag */}
                {/* <input className="form-control" type={field.type} name={field.name}  id={field.id} placeholder={field.placeholder}/> */}
                {renderElement}
                <span style={{color:'red'}} className="mb-4" id={"span_" + this.props.field.id}></span>
            </div>
        )
    }
}

export default DyanamicFormField;


/* $(function(){
    $("input[name=Password]")[0].oninvalid = function () {
        this.setCustomValidity("Please enter at least 5 characters.");
    };
}); */