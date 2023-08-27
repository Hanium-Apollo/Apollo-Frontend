import styled from "@emotion/styled";

const TagBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
`;
const TagItem = styled.div`
  text-align: center;
  display: grid;
  background-color: #4cbccc;
  border-radius: 10px;
  min-width: 50px;
  overflow: auto;
  height: 80%;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px 0px 5px;
`;
interface TagProps {
  tagName: string;
}

export const Tag = (tag: TagProps) => {
  return (
    <TagBox>
      <TagItem>{tag.tagName}</TagItem>
    </TagBox>
  );
};

export default Tag;
