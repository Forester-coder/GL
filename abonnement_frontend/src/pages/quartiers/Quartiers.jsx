import { useEffect, useState } from 'react';
import API from '../../services/api'; // Importer l'instance d'Axios configurée
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { jsPDF } from 'jspdf'; // Importer jsPDF

function Quartiers() {
    const [quartiers, setQuartiers] = useState([]);
    const [filteredQuartiers, setFilteredQuartiers] = useState([]); // Quartiers filtrés pour la recherche
    const [form, setForm] = useState({ id: null, nom: '', description: '' });
    const [searchTerm, setSearchTerm] = useState(''); // Mot-clé pour la recherche
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false); // Modale pour confirmation/erreur
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success'); // Type de message ('success' ou 'error')
    const [selectedQuartier, setSelectedQuartier] = useState(null);

    // Charger les quartiers
    const fetchQuartiers = async () => {
        try {
            const response = await API.get('/quartiers');
            setQuartiers(response.data);
            setFilteredQuartiers(response.data); // Initialiser les quartiers filtrés
        } catch (error) {
            console.error('Erreur lors du chargement des quartiers', error);
            showMessage('Erreur lors du chargement des quartiers.', 'error');
        }
    };

    useEffect(() => {
        fetchQuartiers();
    }, []);

    // Gestion des entrées du formulaire
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Mettre à jour les quartiers affichés en fonction de la recherche
    useEffect(() => {
        const filtered = quartiers.filter((quartier) =>
            quartier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quartier.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuartiers(filtered);
    }, [searchTerm, quartiers]);

    // Ajouter ou mettre à jour un quartier
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await API.put(`/quartiers/${form.id}`, form);
                showMessage('Quartier mis à jour avec succès!', 'success');
            } else {
                await API.post('/quartiers', form);
                showMessage('Quartier ajouté avec succès!', 'success');
            }
            fetchQuartiers();
            setForm({ id: null, nom: '', description: '' });
            setIsEditing(false);
            setShowModal(false); // Fermer la modale
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement', error);
            showMessage('Erreur lors de l\'enregistrement. Veuillez réessayer.', 'error');
        }
    };

    // Supprimer un quartier
    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce quartier ?')) {
            try {
                await API.delete(`/quartiers/${id}`);
                fetchQuartiers();
                showMessage('Quartier supprimé avec succès!', 'success');
            } catch (error) {
                console.error('Erreur lors de la suppression', error);
                showMessage('Erreur lors de la suppression. Veuillez réessayer.', 'error');
            }
        }
    };

    // Passer en mode édition
    const handleEdit = (quartier) => {
        setForm(quartier);
        setIsEditing(true);
        setShowModal(true);
    };

    // Ouvrir la modale pour l'ajout d'un quartier
    const handleAdd = () => {
        setForm({ id: null, nom: '', description: '' });
        setIsEditing(false);
        setShowModal(true);
    };

    // Afficher les détails du quartier dans une modale
    const handleShowDetails = (quartier) => {
        setSelectedQuartier(quartier);
        setShowDetailsModal(true);
    };

    // Afficher une modale de message (confirmation ou erreur)
    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setShowMessageModal(true);
    };

    // Fonction d'exportation des quartiers en PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Liste des Quartiers', 14, 22);

        let yOffset = 30; // Positionnement vertical du texte

        doc.setFontSize(12);
        filteredQuartiers.forEach((quartier, index) => {
            doc.text(`${index + 1}. ${quartier.nom} - ${quartier.description}`, 14, yOffset);
            yOffset += 10;
        });

        doc.save('quartiers.pdf');
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Gestion des Quartiers</h1>

            {/* Barre de recherche */}
            <Form.Control
                type="text"
                placeholder="Rechercher un quartier..."
                className="mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />


        
                {/* Bouton pour ajouter un quartier */}
                <Button variant="primary" onClick={handleAdd} className="mb-4">
                    Ajouter un quartier
                </Button>

                {/* Bouton pour exporter en PDF */}
                <Button variant="secondary" onClick={exportToPDF} className="mb-4">
                    Exporter en PDF
                </Button>
         
            {/* Liste des quartiers */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuartiers.map((quartier, index) => (
                            <tr key={quartier.id}>
                                <td>{index + 1}</td>
                                <td>{quartier.nom}</td>
                                <td>{quartier.description}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        onClick={() => handleShowDetails(quartier)}
                                        className="me-2"
                                    >
                                        Voir Détails
                                    </Button>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleEdit(quartier)}
                                        className="me-2"
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(quartier.id)}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal pour afficher les détails d'un quartier */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Détails du quartier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedQuartier ? (
                        <div>
                            <h5>Nom: {selectedQuartier.nom}</h5>
                            <p>Description: {selectedQuartier.description}</p>
                        </div>
                    ) : (
                        <p>Chargement des détails...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal pour afficher les messages de confirmation ou erreur */}
            <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{messageType === 'success' ? 'Succès' : 'Erreur'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal pour ajouter ou modifier un quartier */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Modifier le quartier' : 'Ajouter un quartier'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={form.nom}
                                onChange={handleChange}
                                placeholder="Nom du quartier"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Description du quartier"
                                rows={3}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Quartiers;
