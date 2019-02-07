package com.example.cleme.app_eip;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class choisir_plateforme extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choisir_plateforme);
    }

    public void choisir_portable(View view)
    {
        Intent intent = new Intent(this, nfc_connect.class);
        startActivity(intent);
    }

    public void deconnection(View view)
    {
        finish();
        return ;
    }
}
