import React from 'react';

class home extends React.Component {
  render() {
    return (
      <section className="main-screen-section">
        <header className="main-screen-header">
          <div className="container-input">
            <input
              type="text"
            />
          </div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </header>
      </section>
    );
  }
}

export default home;
