<?php

namespace App\Http\Controllers;

use App\Models\Depotoir;
use App\Models\Quartier;
use Illuminate\Http\Request;


/**
 * Classe DepotoirController
 *
 * Contrôleur pour gérer les opérations CRUD pour les dépotoirs.
 */
class DepotoirController extends Controller
{
    /**
     * Affiche une liste de tous les dépotoirs.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Depotoir::all(), 200);
    }

    /**
     * Enregistre un nouveau dépotoir dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'latitude' => 'required|string|max:255',
            'longitude' => 'required|string|max:255',
            'quartier_id' => 'nullable|exists:quartiers,id',
        ]);

        $depotoir = Depotoir::create($validated);

        return response()->json($depotoir, 201);
    }

    /**
     * Affiche un dépotoir spécifique.
     *
     * @param  \App\Models\Depotoir  $depotoir
     * @return \Illuminate\Http\Response
     */
    public function show(string $id)
    {
        $depotoir = Depotoir::find($id);

        if (!$depotoir) {
            return response()->json(['message' => 'depotoir not found'], 404);
        }

        return response()->json($depotoir, 200);
    }

    /**
     * Met à jour un dépotoir spécifique dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Depotoir  $depotoir
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $id)
    {

        $depotoir = Depotoir::find($id);

        if (!$depotoir) {
            return response()->json(['message' => 'depotoir not found'], 404);
        }

        $validated = $request->validate([
            'latitude' => 'required|string|max:255',
            'longitude' => 'required|string|max:255',
            'quartier_id' => 'nullable|exists:quartiers,id',
        ]);

        $depotoir->update($validated);

        return response()->json($depotoir, 200);
    }

    /**
     * Supprime un dépotoir spécifique de la base de données.
     *
     * @param  \App\Models\Depotoir  $depotoir
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id)
    {
        $depotoir = Depotoir::find($id);

        if (!$depotoir) {
            return response()->json(['message' => 'depotoir not found'], 404);
        }

        $depotoir->delete();

        return response()->json(['message' => 'depotoir deleted successfully'], 200);
    }



    public function getCoordinates()
    {
        $depotoirs = Depotoir::select('latitude', 'longitude')->get();
        return response()->json($depotoirs);
    }
}
