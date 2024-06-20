import {breakPoints} from '../../../utils/layout/breakpoints';
import {getFontSize} from '../../../utils/layout/getFontSize';
import {styled} from 'styled-components';

const FormButtonWrapper = styled.div`
    padding-top: 25px;
`;
const Button = styled.button`
    background-color: lightgrey;
    color: black;
    border-radius: 5em;
    &:hover {
        cursor: pointer;
        border: 1px solid #9b9b9b;
    }
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(5)};
        width: 220px;
        height: 60px;
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(4)};
        width: 150px;
        height: 50px;
    }
`;

type FormButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    dataTestId: string;
    text: string;
};

const FormButton = (props: FormButtonProps) => {
    return (
        <FormButtonWrapper>
            <Button data-test-id={props.dataTestId} type='submit'>
                {props.text}
            </Button>
        </FormButtonWrapper>
    );
};

export default FormButton;
