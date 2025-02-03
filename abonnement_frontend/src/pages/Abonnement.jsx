

const Abonnement = () => {


    return (
        <div className="p-5 bg-light">
            <div className="container text-center p-5 border border-4 border-success rounded-5 shadow">
                <h2 className="mb-4 text-success">Choisissez votre mode de paiement</h2>

                <div className="row g-4">

                    {/* Mobile Money */}
                    <div className="col-lg-4 col-sm-12">
                        <a href="/momopay" className="payment-option d-block text-decoration-none">
                            <img
                                src="LogoMoMo.jpeg"
                                alt="logo de Mobile Money"
                                className="img-fluid rounded-circle shadow"
                                style={{ maxHeight: '150px', objectFit: 'contain' }}
                            />
                            <h5 className="mt-3 text-dark">Mobile Money</h5>
                        </a>
                    </div>

                    {/* Orange Money */}
                    <div className="col-lg-4 col-sm-12">
                        <a href="#" className="payment-option d-block text-decoration-none">
                            <img
                                src="logoOM.png"
                                alt="logo de Orange Money"
                                className="img-fluid rounded-circle shadow"
                                style={{ maxHeight: '150px', objectFit: 'contain' }}
                            />
                            <h5 className="mt-3 text-dark">Orange Money</h5>
                        </a>
                    </div>
                    
                    {/* VISA */}
                    <div className="col-lg-4 col-sm-12">
                        <a href="#" className="payment-option d-block text-decoration-none">
                            <img
                                src="VISA.png"
                                alt="logo de VISA"
                                className="img-fluid rounded-circle shadow"
                                style={{ maxHeight: '150px', objectFit: 'contain' }}
                            />
                            <h5 className="mt-3 text-dark">VISA</h5>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Abonnement;
