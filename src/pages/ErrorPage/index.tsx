import './style.scss';
export default function ErrorPage() {
  return (
    <section className="error">
      <div className="error__container">
        <h1>OOPS!</h1>
        <h3>404 - THE PAGE CAN'T BE FOUND</h3>
        <button>BACK TO HOME</button>
      </div>
    </section>
  );
}
