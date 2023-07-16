import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/css/button.css';

interface ButtonProps {
    text: string;
    css: string;
  }

function Button(props:any) {
    const navigate = useNavigate();
    const set_context = () => {
        if (props.text === "home")
            return "홈으로";
        else if (props.text === "monitor")
            return "모니터링";
        else if (props.text === "back")
            return "이전으로";
    };
    const goTo = () => {
        const value = props.value;
        if (props.text === "home")
            navigate("/");
        else if (props.text === "monitor")
            navigate("/monitor", { state: { value } });
        else if (props.text === "back")
            navigate(-1);
    };
    return (
            <button className={props.css} type="submit" onClick={goTo}>{set_context()}</button>
    );
}

export default Button;
