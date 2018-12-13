package com.example.cleme.app_eip;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import com.example.cleme.app_eip.nfc_deal.main_nfc;

public class nfc_connect extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        main_nfc co = new main_nfc();
        Intent intent = new Intent(this, choisir_plateforme.class);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nfc_connect);
        co.resolveIntent(intent);
    }

    public void deconection(View view)
    {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}
