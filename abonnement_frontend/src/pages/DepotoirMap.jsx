import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import API from '../services/api'; // Utilisez votre configuration API
import 'leaflet/dist/leaflet.css';

// Icône personnalisée pour les dépotoirs
const depotoirIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Icône de poubelle
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Icône pour l'utilisateur
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991107.png', // Icône utilisateur
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Composant pour centrer la carte
const SetViewOnPosition = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13); // Zoom initial de 13
    }
  }, [map, position]);
  return null;
};

const DepotoirMap = () => {
  const [depotoirs, setDepotoirs] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  // Chargement des données des dépotoirs
  useEffect(() => {
    const fetchDepotoirs = async () => {
      try {
        const response = await API.get('/depotoirs'); // Remplacez par l'URL correcte de votre API
        setDepotoirs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dépotoirs :', error);
      }
    };

    fetchDepotoirs();
  }, []);

  // Récupération de la position de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Erreur de géolocalisation :', error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  }, []);

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="display-5">Carte des Dépotoirs</h1>
        <p className="text-muted">
          Découvrez les dépotoirs et votre position actuelle.
        </p>
      </div>
      <div
        className="map-wrapper"
        style={{
          border: '5px solid #ccc',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <MapContainer
          center={userPosition || [5.45, 10.05]} // Centré sur la position utilisateur ou une position par défaut
          zoom={13}
          style={{ height: '80vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userPosition && <SetViewOnPosition position={userPosition} />}
          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup>
                <div style={{ fontSize: '14px', textAlign: 'center' }}>
                  <h6 className="text-primary">Votre position</h6>
                  <p className="mb-0">
                    <strong>Latitude :</strong> {userPosition[0]}
                  </p>
                  <p className="mb-0">
                    <strong>Longitude :</strong> {userPosition[1]}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
          {depotoirs.map((depotoir) => (
            <Marker
              key={depotoir.id}
              position={[depotoir.latitude, depotoir.longitude]}
              icon={depotoirIcon}
            >
              <Popup>
                <div style={{ fontSize: '14px', textAlign: 'center' }}>
                  <h6 className="text-success mb-1">{depotoir.quartier?.nom || 'Non défini'}</h6>
                  <p className="mb-0">
                    <strong>Latitude :</strong> {depotoir.latitude}
                  </p>
                  <p className="mb-0">
                    <strong>Longitude :</strong> {depotoir.longitude}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DepotoirMap;
