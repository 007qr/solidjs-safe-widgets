import { EditorElement } from "../providers/editor-provider";
import Container from "./Container";
import TextComponent from "./TextComponent";
import ThreeStepCard from "./ThreeStepCard";

type Props = {
    element: EditorElement
}


const Recursive = ({element}: Props) => {

    switch(element.type) {
        case 'three-step-card':
            return <ThreeStepCard element={element} altText="" nextButton={false} steps={[]} />
        case 'container':
            return <Container element={element} />
        case 'text':
            return <TextComponent element={element} />
        case '__body':
            return <Container element={element} />
        default:
            return null;
    }
}

export default Recursive;