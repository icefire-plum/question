import styled from "styled-components";

const Container = styled.div`
  width: 200px;
  margin: 12px 0;
  line-height: 1;
  text-align: center;
`;
const StyleTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1890ff;
`;
const Logo = () => {
  return (
    <Container>
      <StyleTitle>question</StyleTitle>
    </Container>
  );
};

export default Logo;
