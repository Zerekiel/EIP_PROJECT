package com.example.cleme.app_eip;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class nfc_connect extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nfc_connect);
    }

    public void deconection(View view)
    {
        Intent intent = new Intent(this, choisir_plateforme.class);
        startActivity(intent);
    }
}
