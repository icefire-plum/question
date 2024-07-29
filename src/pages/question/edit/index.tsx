import styled from "styled-components";
import EditHeader from "./EditHeader";
import LeftPanel from "./LeftPanel";
import EditCanvas from "./EditCanvas";
import RightPanel from "./RightPanel";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f2f5;
`;

const StyledContentWrapper = styled.div`
  flex: auto;
  padding: 12px 0;
`;
const StyledContent = styled.div`
  margin: 0 24px;
  display: flex;
  height: 100%;

  .left {
    width: 295px;
    background-color: #fff;
    padding: 0 12px;
  }

  .main {
    flex: 1;
    position: relative;
    overflow: hidden;

    .canvas-wrapper {
      position: absolute;
      width: 400px;
      height: 712px;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      overflow: auto;
      box-shadow: 0 2px 10px #0000001f;
    }
  }

  .right {
    width: 300px;
    background-color: #fff;
    padding: 0 12px;
  }
`;
const Edit = () => {
  const { loading } = { loading: false };

  function clearSelectedId() {
    //
  }
  return (
    <StyledContainer>
      <EditHeader />
      <StyledContentWrapper>
        <StyledContent>
          <div className="left">
            <LeftPanel />
          </div>
          <div className="main" onClick={clearSelectedId}>
            <div className="canvas-wrapper">
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className="right">
            <RightPanel />
          </div>
        </StyledContent>
      </StyledContentWrapper>
    </StyledContainer>
  );
};
export default Edit;
