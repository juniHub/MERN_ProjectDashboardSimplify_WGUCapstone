import styled from 'styled-components'

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    background:#5f6c7b;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 100px;
    height: 100px;
    display: grid;
    place-items: center;
    background: var(--grey-200);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--black);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
      color: #ffffff;
    }
    p {
      margin: 0;
      margin-bottom: 0.5rem;
      text-transform: capitalize;
      color: #ffffff;
      letter-spacing: var(--letterSpacing);
    }
  }
  .working {
    background: #8bd3dd;
    color: #00214d
   
  }
  .finished{
    background: #00ebc7;
    color: #00214d

  }
  .cancelled {
  
    background: #f582ae;
    color: #00214d
  }
  .content {
    padding: 1rem 1.5rem;
 
   
  }
  .content-center {
   
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 100%;
  }
  footer {
    margin-top: 1rem;
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
`

export default Wrapper
