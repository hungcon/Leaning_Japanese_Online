import React, { Component } from 'react';
import Answer from '../ChooseQuestion/Answer';
import { connect } from 'react-redux';
import Option from '../FillQuestion/Option';
import ContentChoose from '../FillQuestion/ContentChoose';
import {Redirect} from 'react-router-dom';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            displayButtonChoose: false,
            submitTestABCD: false,
            submitTestFill: false,
        }
    }

    increaseQuestionId = (type) => {
        if (type === "ABCD") {
            var userAnswers = this.props.userAnswer;
            if (this.state.id < userAnswers.length) {
                this.props.displayNextButtonQs();
            } else {
                this.props.hideNextButton();
            }
            this.getAnswerData();
        } else {
            this.getFillString();
            this.props.hideNextButton();
        }
        this.setState({
            id: this.state.id + 1,
        });
    }

    decreaseQuestionId = () => {
        this.setState({
            id: this.state.id - 1
        }
        );
        // Xử lí không click đáp án mà vẫn back 
        if (this.props.answeredQs === true) {
            this.getAnswerData();
        }

        this.props.displayNextButtonQs();

    }

    displayPreButton = () => {
        if (this.state.id !== 1) {
            return <button className="btn btn-danger w-20 btn-lg float-left mt-3 ml-2" onClick={() => this.decreaseQuestionId()}>
                Previous
                    </button>
        }
    }

    displayNextButton = (type) => {
        if (this.state.id !== 10 && this.props.displayNextButton) {
            return <button className="btn btn-info w-20 btn-lg float-right mt-3" onClick={() => this.increaseQuestionId(type)}>
                Next
                    </button>
        }
        if (this.state.id === 10) {
            return <button className="btn btn-info w-20 btn-lg float-right mt-3" onClick={() => this.submitTest(type)}>
                Finish
                    </button>
        }
    }


    // Hàm xử lí thêm mới hay cập nhật dữ liệu vào mảng đáp án lưu trong store 
    getAnswerData = () => {
        // Quay trở  trạng thái click chọn đáp án  mỗi lần next hay pre câu hỏi 
        this.props.resetAnsweredQs();
        var userAnswers = this.props.userAnswer;
        var temp = 0;

        // Kiểm tra vị trí đang đứng thuộc câu hỏi nào để thêm mới hay cập nhật câu trả lời 
        for (var j = 0; j < userAnswers.length; j++) {
            if (userAnswers[j].idQuestion === (this.state.id)) {
                temp = 1;
                break;
            }
        }
        // console.log(temp);
        if (temp === 0) {
            this.props.hideNextButton();
            var newAnswer = {};
            newAnswer.idQuestion = this.state.id;
            newAnswer.answerData = this.props.answerData;
            this.props.addData(newAnswer);
            this.props.updateLocationQs(this.state.id + 1);
        } else {

            var updateAnswer = {};
            updateAnswer.idQuestion = this.state.id;
            var oldUserAnswers = this.props.userAnswer;
            var oldAnswer = '';

            for (var i = 0; i < oldUserAnswers.length; i++) {
                if (oldUserAnswers[i].idQuestion === this.state.id) {
                    oldAnswer = oldUserAnswers[i].answerData;
                }
            }

            // Nếu người back lại và chọn lại đáp án , cập nhật đáp án mới , ngược lại lấy đáp án cũ 
            if (this.props.answeredQs === true) {
                updateAnswer.answerData = this.props.answerData;
            } else {
                updateAnswer.answerData = oldAnswer;
            }
            this.props.updateAnswerQs(updateAnswer);

            // Vị sau sau lần back đầu tiền phải ẩn đi nút button 
            if (this.state.id === userAnswers.length) {
                this.props.hideNextButton();
            } else {
                this.props.displayNextButtonQs();
            }


        }
    }

    // Hàm xử lí khi click kết thúc bài test 
    submitTest = (type) => {
        if (type === "ABCD") {
            this.props.resetAnsweredQs();
            this.getAnswerData();
            this.setState({
                submitTestABCD: true
            });
        } else {
            this.getFillString();
            this.setState({
                submitTestFill: true
            });
        }
        console.log("Hoan Thanh bai test ");
    }



    // lấy chuỗi trả lời của người dùng : câu hỏi choose
    getFillString = () => {
        var contentBoxArr = document.getElementsByClassName("q-3-dot");
        var size = contentBoxArr.length;
        var chooseString = "";
        for (let i = 0; i < size - 1; i++) {
            chooseString = chooseString.concat(contentBoxArr[i].innerText);
            chooseString = chooseString.concat("+");
        }
        chooseString = chooseString.concat(contentBoxArr[size - 1].innerText);
        var id = this.state.id;
        var newelement = {
            "id": id,
            "choose": chooseString
        };
        this.props.storeResult(newelement);

    }
    componentDidUpdate(){
        if(this.props.testTimeFinish){
            this.submitTest(this.props.type);
            this.props.handleSubmitTest()
        }
    }

    render() {
        if(this.state.submitTestABCD === true || this.state.submitTestFill === true ){
            return  <Redirect to={'/result/' + this.props.lesson_id + '/' + this.props.type }  />;
        }

        var data =this.props.questions;
        const typeQuestion = this.props.type;
        return (
            <div>
                {Object.values(data).map((value, key) => {
                    if (((value.id % 10) ? (value.id % 10) : 10)=== this.state.id) {
                        if (typeQuestion === "ABCD") {
                            return (
                                <div className="row" key={key}>
                                    <div className="col-lg-3" />
                                    <div className="col-lg-6 mb-4">
                                        <div className="card shadow">
                                            <div className="card-header">
                                                <h6 className="m-0 font-weight-bold text-primary q-number">
                                                    Question  {(value.id % 10) ? (value.id % 10) : 10}    ({(value.id % 10) ? (value.id % 10) : 10}/10)
                                            </h6>
                                                <div className="result-btn q-result btn btn-success btn-circle btn-md q">
                                                    <i className="fas fa-check">
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <img className="img-fluid px-3 px-sm-4 mb-2 q-image" style={{ width: '20rem' }} src={value.questionImagePath} alt="" />
                                                </div>
                                                <p className="q-question mt-2 q">{value.questionContent}</p>
                                                <p>Select one: </p>
                                                <Answer answerImagePath="/img/q-answer-a.png" answerContent={value.answerA} answerName="A" answerId={value.id} />
                                                <Answer answerImagePath="/img/q-answer-b.png" answerContent={value.answerB} answerName="B" answerId={value.id} />
                                                <Answer answerImagePath="/img/q-answer-c.png" answerContent={value.answerC} answerName="C" answerId={value.id} />
                                                <Answer answerImagePath="/img/q-answer-d.png" answerContent={value.answerD} answerName="D" answerId={value.id} />
                                            </div>
                                            <div className="q-continue mb-3 mr-2">
                                                {this.displayPreButton()}
                                                {this.displayNextButton("ABCD")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3" />
                                </div>
                            )
                        } else {
                            return (
                                <div className="row" key={key}>
                                    <div className="col-lg-3" />
                                    <div className="col-lg-6 mb-4">
                                        <div className="card shadow">
                                            <div className="card-header">
                                                <h6 className="m-0 font-weight-bold text-primary q-number">
                                                    Question  {(value.id % 10) ? (value.id % 10) : 10}    ({(value.id % 10) ? (value.id % 10) : 10}/10)
                                                            </h6>
                                                <div className="result-btn q-result btn btn-success btn-circle btn-md q">
                                                    <i className="fas fa-check">
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <img className="img-fluid px-3 px-sm-4 mb-2 q-image" style={{ width: '20rem' }} src={value.questionImagePath} alt='' />
                                                </div>
                                                <ContentChoose
                                                    question={value.questionContent}
                                                    userAnswered={this.props.arrChoosed}
                                                />
                                                <p>Choose: </p>
                                                <Option
                                                    option={value.option}
                                                />
                                            </div>
                                            <div className="q-continue mb-3 mr-2">
                                                {this.displayNextButton("Fill")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3" />
                                </div>
                            )
                        }

                    }
                    return "";
                }
                )}
            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        answerData: state.answerData,
        userAnswer: state.userAnswer,
        answeredQs: state.answeredQs,
        previousLocation: state.currentLocationQs,
        displayNextButton: state.displayNextButton,
        arrChoosed: state.chooseString,
        testTimeFinish : state.testTimeFinish,
        notification: state.notification
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addData: (answer) => {
            dispatch({ type: 'ADD_ANSWER', answerAdd: answer })
        },
        updateLocationQs: (currentLocation) => {
            dispatch({ type: 'UPDATE_LOCATION_QUESTION', currentLocation: currentLocation })
        },
        updateAnswerQs: (updateAnswer) => {
            dispatch({ type: 'UPDATE_ANSWER', answerUpdate: updateAnswer })
        },
        resetAnsweredQs: () => {
            dispatch({ type: 'RESET_STATUS_ANSWERED' })
        },
        hideNextButton: () => {
            dispatch({ type: 'HIDE_NEXT_BUTTON' })
        },
        displayNextButtonQs: () => {
            dispatch({ type: 'DISPLAY_NEXT_BUTTON' })
        },
        storeResult: (str) => {
            dispatch({ type: 'STORE_CHOOSE_STRING', chooseStr: str })
        },
        handleSubmitTest: (str) => {
            dispatch({ type: 'HANDLE_SUBMIT_TEST' })
        },
        AlertOn: (data,classDispath) => {
            dispatch({type:'SHOW_MESSAGE', message: data, class: classDispath})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);