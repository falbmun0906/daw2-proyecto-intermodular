package com.example.backend.model;

/**
 * Enum con tipos de dieta para las recetas.
 * Proporciona etiquetas (badges) que describen características dietéticas de una receta.
 */
public enum TipoDieta {
    VEGANO("Vegano"),
    VEGETARIANO("Vegetariano"),
    CARNE("Con Carne"),
    PESCADO("Con Pescado"),
    SIN_GLUTEN("Sin Gluten"),
    KETO("Keto"),
    BAJO_EN_CARBOS("Bajo en Carbos"),
    ALTO_EN_PROTEINA("Alto en Proteína"),
    BAJO_EN_CALORIAS("Bajo en Calorías"),
    ORGANICO("Orgánico"),
    PICANTE("Picante"),
    LACTOSA_FREE("Sin Lactosa"),
    PALEO("Paleo"),
    AYURVEDA("Ayurveda"),
    MACROBIOTICA("Macrobiótica"),
    CRUDO("Crudo"),
    AFRODISIACO("Afrodisiaco"),
    DIETA_MEDITERRANEA("Dieta Mediterránea"),
    COMIDA_RAPIDA_SALUDABLE("Comida Rápida Saludable"),
    POSTRES_SALUDABLES("Postres Saludables");

    private final String etiqueta;

    TipoDieta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public String getEtiqueta() {
        return etiqueta;
    }
}

