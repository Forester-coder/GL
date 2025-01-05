import { useEffect, useState } from "react";
import API from "../services/api"
import { Alert } from "react-bootstrap";


const MOMOPay = () => {

    const [methodAbonnement, setMethodAbonnement] = useState([])

    const [formData, setFormData] = useState({
        planId: '',
        phoneNumber: '',
    })

    const [message, setMessage] = useState({ text: '', type: '' });


    useEffect(() => {
        fetchTypeAbonnement()
    }, []);

    const fetchTypeAbonnement = async () => {
        const response = await API.get('/subscription-plan');
        setMethodAbonnement(response.data);
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/momo-pay', formData)
            const result = await response.data
            console.log('Abonnement reussie ; ', result)
            setMessage({ text: 'Abonnement reussie ; ', type: 'success' })
        } catch (error) {
            setMessage({ text: 'erreur lors de la soumision', type: 'danger' })
            console.error('erreur lors de la soumision :'.error.response?.data || error.message)
        }

    }



    return (
        <div className="container mx-auto my-5 py-5 border border-5 border-success rounded-5 shadow-lg bg-light">
            <div className="text-center mb-4">
                <img src="LogoMoMo.jpeg" alt="Logo de MoMo" className="img-fluid" style={{ maxHeight: '120px', objectFit: 'contain' }} />
            </div>

            {/* Affichage des messages */}
            {message.text && (
                <Alert variant={message.type} onClose={() => setMessage({ text: '', type: '' })} dismissible>
                    {message.text}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                {/* Type d'abonnement */}
                <div className="mb-4">
                    <label htmlFor="planId" className="form-label">Type Abonnement</label>
                    <select
                        id="planId"
                        name="planId"
                        value={formData.planId}
                        onChange={handleChange}
                        className="form-select form-control-lg border-3 shadow-sm"
                        required
                    >
                        <option>selectionner votre mode d'abonnement</option>
                        {methodAbonnement.map((methodAbonnement) => (
                            <option key={methodAbonnement.id} value={methodAbonnement.id}>
                              {methodAbonnement.id} - {methodAbonnement.name} - {methodAbonnement.price} FCFA
                            </option>
                        ))}
                    </select>
                </div>

                {/* Numéro de téléphone */}
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="form-label">Numéro de Telephone</label>
                    <div className="input-group">
                        <span className="input-group-text">+237</span>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="form-control form-control-lg border-3 shadow-sm"
                            placeholder="Numéro de téléphone"
                        />
                    </div>
                </div>

                {/* Bouton de paiement */}
                <div className="text-center">
                    <button className="btn btn-success px-5 py-3 btn-lg" type="submit">
                        Souscrire
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MOMOPay;
