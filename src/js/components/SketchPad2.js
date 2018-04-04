import React from 'react';
//import Signature from 'react-another-signature-pad';
import PropTypes from "prop-types";
import RaisedButton from 'material-ui/RaisedButton'; //drawdata
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SignaturePad from 'react-signature-pad';

const sketchstyle = {
  width: '100%',
  height: 500,
  borderRadius: 4,
  borderWidth: 4,
  borderStyle: 'solid',
  borderColor: '#000',
};
const sketchModalStyle = {
  width: '100%',
  maxWidth: 'none',
  height: '90%'
};

class SketchPad2 extends React.Component {
  constructor() {
    super();
    this.state = {
      sizeofdot: 1,
      brushcolor: 'rgba(0, 0, 0, 1)',
      open: false,
      sketchdata: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATgAAACWCAYAAABKHpRAAAAfA0lEQVR4Xu2dC/Bc1V3HF2gj2vAS5f3YhBhhRiQVCFiBbtqpyEtg1GkhjCx9TAvYJuGhwoAutkNhGCAIqWAd+KcCaRwsSaEQqyNLAWtKawk4RaAdlnRAHmlJKEUIIfH7We7592Rzd/c+9967/9+Z+c3d3XvO7/zO99zz3d953u1qFgwBQ8AQGFMEthvTclmxDAFDwBCoGcHZQ2AIGAJji4AR3NhWrRXMEDAEjODsGTAEDIGxRcAIbmyr1gpmCBgCRnD2DBgChsDYImAEN7ZVawUzBAwBIzh7BgwBQ2BsETCCG9uqtYIZAoaAEZw9A4aAITC2CBjBjW3VWsEMAUPACM6eAUPAEBhbBIzgxrZqrWCGgCFgBGfPgCFgCIwtAkZwY1u1VjBDwBAwgrNnwBAwBMYWASO4sa1aK5ghYAgYwdkzYAgYAmOLgBHc2FatFcwQMASM4OwZMAQMgbFFwAhubKvWCmYIGAJGcPYMGAKGwNgiYAQ3tlVrBTMEDAEjOHsGDAFDYGwRMIIb26q1ghkChoARnD0DhoAhMLYIGMGNbdVawQwBQ8AIzp4BQ8AQGFsEjODGtmqtYIaAIWAEZ8+AIWAIjC0CRnBjW7XhBduyZUtddw4L7q7ZbrvtOlMMAivuFELACG4KVLZIbVcV868lTQmf/bBeXyYkV4js+GzBEBgbBIzgxqYq+3psDd25TYLnNijgyZ0jkmuPOSRWvCmEgBHcGFe2PDfI7YGYRZxnJBcTMYteWgSM4EpbNekMC7ql34/gufVmhCf3fuuupsPfUpcDASO4ctRD5laI4BZL6YKEim8QwS1MmNaSGQKlQcAIrjRVka0hIjgmDHZJqHW9CG63hGktmSFQGgSM4EpTFdkZEiwFeTalxhm2hCQlgpa8cASM4AqvguwNEMGdJq13p9R8ughuRUodltwQKBQBI7hC4c8ncxFcU5pZGpImsGRkIo0CS2sIFI2AEVzRNZBD/iK4S6T2ypSqzxfBfSmlDktuCBSKgBFc9vCzUwDpZK86mkYRHJ7X2dFi9421VASHJ2jBEKgsAkZw2VZdXerc4H5bnyGaB0dNdiK4Vcrz+JRF+xcR3B+k1GHJDYFCETCCyxZ+n+CcZpZr4M0xYL90FGQngvuO8jkyZdEeFcHNTanDkhsChSJgBJc9/HRPmcVETg1R78gOwsO7yzxk5ME9IoI7JnPjTKEhMEIEjODyB9uRHdfehbd4dxCdI7tMTvMQwaEvjFzjlHalCA6bLRgClUXACC7bqnMTDAcGavk+x8uiHnzn2ntsEdH+U8Lm+DWSpySPJTEv5TYtl6URXBLwLU2pEDCC618dDd3aEhCRIy5HShAUwoTCjIC0wggri8r+mZT8SIJ3B+ntKHlV8lxgH787Ib8N69atO2H33XdPu0yE8+FaWRTAdBgCRSFgBPeuh/XBgLAgNYgrClltULx/k7wniI+35bqYnR7ScQTE72GBsa7fl3xUMjskwk8DQoPo3hvk55PuVl3fRqNRe+CBuKckbZOrLfQtqlVavpkhMBUJzk0CQGqMMfWSGd1DiMiRlPsM6L3ElVlFeIqGTVL0G7eb7A7PnTt3+urVq+9JaRxHJiXqIqfM15IbApkhMFUIjsbPoHtT0vDQo5vXltCQ3TUzcDNSBAk7CTsdhAkFbF8ZEHA3W43D4fUlOhHk7bfffmPatGnvC+wHL/4MCPx2Z4BXRsXLXk1wFh71XZdgPwGMOuBkZ91lj3lZNY4zwUFqrOY/ScKaMOep4aFNSCAGHvgsAg0J6e2ihun2u5bEj2MD3emmBMJzExl+HhA15VqpRn6VrokW+y5durTWbJJN3zBPd9pZAJe1juAU40FHtIO3Hc2eNfAl1TduBAfJ4G0slEAGBAbm/ydokIsT1IPT2Qh0Or2o2iRhDK5feEk3fkkSZUzvXxXv54Ei1zVs6zteZickA+xynp3zsCajff7zn9942WWXTYtb3g0bNtTq9Xpt/fr1bwfle1NXPEGuTHAQsJUxw1IFkVtLBvFynSjBJlGioFTxOONAcM5Ta6oufPJhEe2EBI/GeVZRqwviwPvjOig4gmPCIaz7CMFBDI7gsMNJr15mS3cKyhCmq617TvwFwnX9fkJg6+/ourtku3a7XfvgB7fhvaHlv/nmm68699xzlyti7/jbX+m3KwIFG3X9jwBfusZx8R1qR9wI9v6JuIhNjfhVJjjIjCO5m15V4e1AaHhqnZhVSJevIWlJII3eAIm1g4aPbgQSyKNxQ4jYgFBO7OLqE9//6vt0CaS4Teh0OrUDDwzrxYbFnvztTo1PzR8QgzKj9EbJAYFd2DQhgfy4P/IQjLk9roz3j5k59tr7J2KCVqXoVSS4ugC+XuJ7V+zxhNiQuAEygShbIQkhNRpvEsKMa0dYfEgNN6whody+h0p8upEsG/HDD/Vl7eLFiz+EBzdnTm+S/maJ3JI8D+DWlEB84A/R9Xp/WWDRV4cI7u908zMJM7HlMAmBq0KyJA90keVaqMwZY3FdPoiNBtZJaBR6lkjO7EmPJwipTUjy8ND6mYs9zP5B3oO6x3RR24F9lL0hqUtgszk77LDD4e+88w7eXe24446rzZw5s0t0p556and8LSw899xz3KOs7o+CrmecgL1gBtGB20g8OpEbJxcPwmpYGWwsbhhCFb5fFYKj4fMg05AJNPCmpJMSe3T4J9/+RN+ZffwHyaiIjbLhpWFLv4bqut5txUEG2qZG/0l1Ub+8YsWK2lNPPVX79re/XVuzhsljsaAI7rTTTqstWLBgK7JbuXJl93cvOLIjvzjjbPwJtSSu63pOyjrqm1zlfEQ3P5BS/4NyXBspdVjykiJQBYLj4YPcIAK6jDQePIUsAkT2iUDR13VlYmFUxIa3RX7NoGx+eSgnnlQ7uMayKWzAnUkHBNLzyW7hwoW1s88+u/b4448vUZeWSRNYLmzwzvfsothDPUF2EB2f3QRFFvXGOj+2ajQyUGYElwGIZVVRdoLzu6RZeW1+XZynL3RRCadI7s25olwX9M+UzxE9eTlSc0SS2JRhyyUee+yxLtE5sjvqqKNqL7/88qpnn332q8qUbj/k2wwI5LAQQ6KSHeWlDh3RcUV/FILsW36Vz5/RTYxTkNC6qGkRLHH6MhMcjcgd+XND0EiyhvJEKfxGoPQ4XR/KOgNPH42byYx6Tx4Q94SE8qZq+E7vMILz88erW758eU3LQ+gG47lhA96W85KxF6+uKRlEdpSj0wc/R3SMn9LdfSwoc7/4fatBZYOE2bObVbC3h2WFZAn1lJHgaFAMGO0c4HV60PjzgK8hpW5X+jx9bueQCeWhi41X5ALeGg315qCxZ5ptgvPgtmgcaqaMaEogoXckrMsDE8jIBcoyiOwccfXz0hzRkY+bdYVIIcehIaODPP18IPU5tnVrKPSVjVA2gqPxQAabgwZGg8rEq+lTQ5DO94N7M3TtZFyTDenr3TbkvKPcyiUieEH57h2zLK6rBub+H8yn9f3vQ3QRj/JRZ2GHa0J2jrx6cXVpW4oD0XGfuH27rxm9SKe3GItEbs5TjQmXRa8CAmUiOB52t82GbgwNJ+9AQ3s2yITtSFmSDo3feYdkAWk0Jb5HlEv5RAZbkijuWQd3q3S4GdBh5I9nRn2FkR2YQmATIQRGOnCCZFz3mHj8CUzWRQKPNErx16i8vlcdJY3FqRgCZSA4HnK8HEdoeY23hVVNHh4c5fms5G+8DPFMILcogfS+MAuJnfzmN0j2rb4l+ZYE0oRA1yfcsuTsmqdG3w6+1HV15A/RTUQxPrCzEZQ3zLND/wrJVqef6DtpWhKWzEBui8gzJ8+NovhljVg0i1Y1BMpAcDzwbtPkKMmNuqJROS8rCyx6yZo8ug01aLTDno+6IjhSGRY37H7nyCOP3HzSSSfN5NBLtmr1W9jbR7nfZfNtoQxJunKDPDtMoO6vlTzs4cMfHXjt8s1vfvOHH/nIR2YlAWJIGnuhTg6gllFlFo06TbloNMwsEuJ4OWny9NM29CUrgqMxo8v3suLOzPqk4tvJpAShIyFO2Gb8UEx23XXXGmSHRNi65S+Z8L3bj0k5G/DTBNcdbUoJuPeWgd/cZMOut99++w/nz5/PwQF5hJPkqd6Xh2LTWS4EiiQ4/qmZUCDwYPOAjzrUlaHzmNJi0ZIuN4ZId5HyJBnT87unnQE6Tta9QyV7SiAj5wUPxNARHrsWILweD88nOOzPa4bZkd2nlAdLdVx4vz48Fpxl9xc5PQwvidz2ykm3qS0ZAmkbddLi8IBDLFzxTiCaJGSQNH+Xjvxflmwv+bWUNmA/Xkl36UFKXUnKRVnql19++V1r1649iNNEHnxw+OoL9qhCduxT1Wef4Pw/oLyW0FBO7P53CaeTzArGEN0fXxIchqWxo9iHITRG94siuJYwdN5OnAHsPKB3xJSmEfvduULLI4KA1egadwMLedm54LZqcaBlv7Dbbrutf/XVVyd0n+EC1+UmehpshtUZ2DFUwYQCkyV4jeSdR7BdC3mgWmKdRRBcXXi4biFdOX/MqgioaFSs0GdpQiuhAZ9Uui8HabvdrIR6UicTSXSkJGwvaVc3np0jO66cItIncFgn3V8Cx77nMWYFkeGtPSe7F+raO4aZGg9PgS0LyRLNiugqguAmhM3ZAT55egZRq8DZk2btXUuZOY+0CEwnyxp3ka8jPLy8+++//+dPP/20e9mMjx9nzLFPl1nuTlRgI8SD1MBuTrAcJNI4YgS9vVFwW9mxkKXtCcywJKNGYNSNkX/sV4NCFjWx0IuxP9aUdLFvW0ppnIWXSUTBLpDE9SoSAAO86qbE/RH5mOGd0oWlzGk81brS48kvks3kF5ZXVu3BDrXMCsmK6UncEBKWk7EWtyyk0K6cZ79Pumfp9zsSlM0RXBovMEG22yZJuovB0zQj8H'
    };
    this.startSignature = this.startSignature.bind(this);
    this.changeDot = this.changeDot.bind(this);
    this.handleSignatureChange = this.handleSignatureChange.bind(this);
    this.clearSketch = this.clearSketch.bind(this);

  }

  handleOpen = () => {
    this.setState({ open: true });
    console.log("hola " + this.state.sketchdata);
    this.mySignature.fromDataURL(this.state.sketchdata);
  };

  handleClose = () => {
    this.setState({ open: false });
    const data = this.mySignature.toData();
    this.props.sendData(this.state.sketchdata);
  };

  changeDot = (type) => {
    var signature = this.refs.mySignature;

    if (type === "erease") {
      alert(type);
      this.mySignature.minWidth = 5;
      this.mySignature.maxWidth = 10;
      this.mySignature.style = { cursor: 'pointer' };
      this.setState({ "sizeofdot": 30 });
      this.setState({ "brushcolor": 'rgba(255, 255, 255, 0)' });
      this.mySignature.penColor = 'white';
      this.mySignature.dotSize = 500;

    }
    else {
      this.mySignature.minWidth = 0.5;
      this.mySignature.maxWidth = 2;
      this.mySignature.style = { cursor: 'crosshair' };
      this.setState({ "sizeofdot": 1 });
      this.setState({ "brushcolor": 'rgba(0, 0, 0, 1)' });
      this.mySignature.penColor = 'black';
      this.mySignature.dotSize = 500;
    }

  }
  startSignature() {
    //this.props.startSketch(thisid.key);
  //  var signature = this.refs.mySignature;
    console.log("starting " + this.state.sketchdata);
    var sketchdata = this.state.sketchdata;
    this.setState({sketchdata: sketchdata});
    this.props.sendData(this.state.sketchdata);
  }
  handleSignatureChange(data) {
    // this.props.handleSketchChange(data);
    console.log("ladata "+ data);
   // let sketchdata = this.state.sketchdata;
   // console.log("ladata "+ sketchdata);
    this.setState({sketchdata: data});
    console.log("ladata2 "+ this.state.sketchdata);
   
  }
  clearSketch() {
 //   var signature = this.refs.mySignature;
    this.mySignature.clear();
   // signature.clear();
    
  }
  render() {
    var show = {
      display: this.state.shown ? "none" : "block"
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    return (

      <div>
      
        <RaisedButton label="Draw a Sketch" onClick={this.handleOpen} />

        <Dialog
          title="Draw a Sketch"
          actions={actions}
          modal={true}
          contentStyle={sketchModalStyle}
          open={this.state.open}
        >
          <SignaturePad
            minWidth={0.5}
            maxWidth={2}
            style={{ cursor: 'crosshair' }}
            penColor={this.state.brushcolor}
            dotSize={this.state.sizeofdot}
            onEnd={this.handleSignatureChange}
            onBegin={this.startSignature}
           // ref="mySignature"
            ref={ref => (this.mySignature = ref)}
           // style={sketchstyle}
          />
          <RaisedButton label="Lápiz" onClick={() => this.changeDot("draw")} />
          <RaisedButton label="Borrador" onClick={() => this.changeDot("erease")} />
          <RaisedButton label="Clear" onClick={this.clearSketch} />
        </Dialog>

      </div>

    )
  }
}
SketchPad2.propTypes = {
  sendData:  PropTypes.func.isRequired
  //  index: React.PropTypes.string.isRequired,
  //  currentedit: React.PropTypes.string.isRequired,
  //  handleSketchChange: React.PropTypes.func.isRequired, 
  //  startSketch: React.PropTypes.func.isRequired, 
  //  drawdata: React.PropTypes.string.isRequired, 

};
export default SketchPad2;
