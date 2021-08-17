import { ELEMENT, TEXT } from "./constants";

export function ReactElement($$typeof, type, key, ref, props) {
    let element = {
        $$typeof, type, key, ref, props
    }
    return element;
}

export function createDom(element) {
    let { $$typeof } = element;
    let dom = null;
    if (!$$typeof) {
        // element是一个字符串或者数字，ReactDom.render('hello', document.getElementById("root"));
        dom = document.createTextNode(element);
    } else if ($$typeof === TEXT) {
        dom = document.createTextNode(element.content);
    } else if ($$typeof === ELEMENT) {
        dom = document.createElement(element.type);
    }
    return dom;
}