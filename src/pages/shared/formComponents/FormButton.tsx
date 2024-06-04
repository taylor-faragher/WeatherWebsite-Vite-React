import {breakPoints} from '../../../utils/layout/breakpoints';
import {getFontSize} from '../../../utils/layout/getFontSize';
import {styled} from 'styled-components';

const FormButtonWrapper = styled.div`
    padding-top: 25px;
`;
const Button = styled.button`
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(6)};
        width: 200px;
        height: 60px;
    }
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(5)};
        width: 150px;
        height: 50px;
    }
`;

type FormButtonProps = {
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
