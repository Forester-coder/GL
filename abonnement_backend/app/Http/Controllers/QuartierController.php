<?php

namespace App\Http\Controllers;

use App\Models\Quartier;
use Illuminate\Http\Request;

class QuartierController extends Controller
{

    /**
     * Affiche une liste de tous les quartiers.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Quartier::all(), 200);
    }

    /**
     * Enregistre un nouveau quartier dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Valide les données du formulaire
        $validated = $request->validate([
            'nom' => 'required|string|unique:quartiers|max:255',
            'description' => 'required|string',
        ]);

        // Crée un nouveau quartier avec les données validées
        $quartier =  Quartier::create($validated);

        return response()->json($quartier, 201);
    }

    /**
     * Affiche un quartier spécifique.
     *
     * @param  \App\Models\Quartier  $quartier
     * @return \Illuminate\Http\Response
     */
    public function show(string $id)
    {
        $quartier = Quartier::find($id);

        if (!$quartier) {
            return response()->json(['message' => 'quartier not found'], 404);
        }

        return response()->json($quartier, 200);
    }



    /**
     * Met à jour un quartier spécifique dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Quartier  $quartier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $id)
    {

        $quartier = Quartier::find($id);

        if (!$quartier) {
            return response()->json(['message' => 'quartier not found'], 404);
        }

        // Valide les données du formulaire de modification
        $validated = $request->validate([
            'nom' => 'required|string|unique:quartiers,nom,' . $quartier->id . '|max:255',
            'description' => 'required|string',
        ]);

        // Met à jour le quartier avec les données validées
        $quartier->update($validated);

        // Redirige vers l'index avec un message de succès
        return response()->json($quartier, 200);
    }

    /**
     * Supprime un quartier spécifique de la base de données.
     *
     * @param  \App\Models\Quartier  $quartier
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id)
    {
        $quartier = Quartier::find($id);

        if (!$quartier) {
            return response()->json(['message' => 'quartier not found'], 404);
        }

        $quartier->delete();

        return response()->json(['message' => 'quartier deleted successfully'], 200);
    }
}
