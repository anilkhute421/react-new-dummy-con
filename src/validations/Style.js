import styled from "styled-components";

export const SelectWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  position: relative;
  .select-box {
    width: 100%;
    height: 40px;
    position: relative;

    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    .chip {
      background: grey;
      color: #000;
    }

    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: #eee;
    }
    .dropDownBox {
      max-width: 100%;
      width: 483px;
      max-height: 300px;
      position: absolute;
      top: calc(100% + 10px);
      overflow-y: auto;
      background-color: #fff;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.295);

      .checkBox {
        width: 60px;
      }
    }

    .search-order {
      width: calc(100% - 30px);
      position: sticky;
      top: 0;
      height: 35px;
      outline: none;
      padding-left: 20px;
    }
  }
`;

export const ListItem = styled.li`
  height: 40px;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  border-bottom: 1px solid #1e1e1e25;

  &:hover {
    background: rgba(86, 186, 253, 0.692);
  }
  div {
 
`;
export const DropDownBox = styled.div`
  max-width: 100%;
  width: 100%;
  max-height: 300px;
  position: absolute;
  top: calc(100% + 10px);
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.295);
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;

    color: #000;
    border-radius: 6px;

    padding: 0;
    overflow-y: auto;
  }
  .checkBox {
    width: 15px;
    margin: auto 15px;
  }
`;
