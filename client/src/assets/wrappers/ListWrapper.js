import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
 
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  
  .list {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }


  .list-row{
    margin-bottom: 0;
    border: solid 1px #000;
    padding: 0.2rem;
  }

  .list-center{
    display: grid;
    row-gap: 0.2rem;
 
  }

  .list-link{
    margin-bottom: 0;
    border: solid 1px #000;
    padding: 0.2rem;
  }

  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  
  .action{
    border: solid 1px #000;
    padding: 0.5rem;
  }

  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }

  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }

  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }

  @media (min-width: 320px) {
 
    .list-center{
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }
 
  }
`

export default Wrapper
