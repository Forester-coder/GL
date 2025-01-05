import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table, Alert } from 'react-bootstrap';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

function Depotoirs() {
    const [depotoirs, setDepotoirs] = useState([]);
    const [quartiers, setQuartiers] = useState([]);  // Etat pour stocker la liste des quartiers
    const [form, setForm] = useState({ id: null, latitude: '', longitude: '', quartier_id: '' });
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedDepotoir, setSelectedDepotoir] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [searchTerm, setSearchTerm] = useState('');  // Etat pour le terme de recherche

    // Récupérer la liste des quartiers et des dépotoirs au chargement du composant
    useEffect(() => {
        fetchDepotoirs();
        fetchQuartiers();
    }, []);

    const fetchDepotoirs = async () => {
        const response = await API.get('/depotoirs');
        setDepotoirs(response.data);
    };

    const fetchQuartiers = async () => {
        const response = await API.get('/quartiers');  // Assurez-vous que l'API retourne les quartiers
        setQuartiers(response.data);
    };

    const getQuartierName = (quartierId) => {
        const quartier = quartiers.find((q) => q.id === quartierId)
        return quartier ? quartier.nom : 'Non defini'
    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                await API.put(`/depotoirs/${form.id}`, form);  // Mise à jour
                setMessage({ text: 'Dépotoir mis à jour avec succès!', type: 'success' });
            } else {
                await API.post('/depotoirs', form);  // Ajout
                setMessage({ text: 'Dépotoir ajouté avec succès!', type: 'success' });
            }
            setShowModal(false);
            fetchDepotoirs();  // Recharger la liste après soumission
        } catch (error) {
            setMessage({ text: 'Une erreur est survenue!', type: 'danger' });
            console.error('Une erreur est survenue!' , error.response?.data)
        }
    };

    const handleEdit = (depotoir) => {
        setForm(depotoir);  // Préremplir le formulaire avec les données à modifier
        setShowModal(true);
    };

    const handleAdd = () => {
        setForm({ id: null, latitude: '', longitude: '', quartier_id: '' });
        setShowModal(true);  // Ouvrir la modale d'ajout
    };

    const handleShowDetails = (depotoir) => {
        setSelectedDepotoir(depotoir);
        setShowDetailsModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce dépotoir ?')) {
            await API.delete(`/depotoirs/${id}`);
            setMessage({ text: 'Dépotoir supprimé avec succès!', type: 'success' });
            fetchDepotoirs();  // Recharger la liste après suppression
        }
    };

    // Filtrer les dépotoirs en fonction du terme de recherche
    const filteredDepotoirs = depotoirs.filter((depotoir) => {
        return (
            depotoir.latitude.toLowerCase().includes(searchTerm.toLowerCase()) ||
            depotoir.longitude.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Gestion des Dépotoirs</h1>

            {/* Affichage des messages */}
            {message.text && (
                <Alert variant={message.type} onClose={() => setMessage({ text: '', type: '' })} dismissible>
                    {message.text}
                </Alert>
            )}

            {/* Champ de recherche */}
            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Rechercher par latitude ou longitude"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Button onClick={handleAdd} variant="primary" className="mb-3">
                Ajouter un Dépotoir
            </Button>

            {/* Tableau des dépotoirs */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Quartier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDepotoirs.map((depotoir) => (
                        <tr key={depotoir.id}>
                            <td>{depotoir.id}</td>
                            <td>{depotoir.latitude}</td>
                            <td>{depotoir.longitude}</td>
                            <td>{depotoir.quartier_id ? getQuartierName(depotoir.quartier_id) : 'Non défini'} </td>
                            <td>
                                <Button
                                    onClick={() => handleShowDetails(depotoir)}
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                >
                                    Détails
                                </Button>
                                <Button
                                    onClick={() => handleEdit(depotoir)}
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                >
                                    Modifier
                                </Button>
                                <Button
                                    onClick={() => handleDelete(depotoir.id)}
                                    variant="danger"
                                    size="sm"
                                >
                                    Supprimer
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal pour afficher les détails d'un dépotoir */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Détails du Dépotoir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDepotoir && (
                        <div>
                            <p><strong>Latitude: </strong> {selectedDepotoir.latitude}</p>
                            <p><strong>Longitude: </strong> {selectedDepotoir.longitude}</p>
                            <p><strong>Quartier: </strong>{getQuartierName(selectedDepotoir.quartier_id)}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Fermer</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal pour ajouter ou modifier un dépotoir */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{form.id ? 'Modifier le Dépotoir' : 'Ajouter un Dépotoir'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                name="latitude"
                                value={form.latitude}
                                onChange={handleChange}
                                required
                                className="mb-3"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                name="longitude"
                                value={form.longitude}
                                onChange={handleChange}
                                required
                                className="mb-3"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quartier</Form.Label>
                            <Form.Control
                                as="select"
                                name="quartier_id"
                                value={form.quartier_id}
                                onChange={handleChange}
                                className="mb-3"
                            >
                                <option value="">Sélectionner un quartier</option>
                                {quartiers.map((quartier) => (
                                    <option key={quartier.id} value={quartier.id}>
                                        {quartier.nom}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">
                            {form.id ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Depotoirs;
