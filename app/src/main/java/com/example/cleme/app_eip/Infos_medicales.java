package com.example.cleme.app_eip;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class Infos_medicales extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_infos_medicales);
    }

    public void return_connect(View view)
    {
        Intent intent = new Intent(this, nfc_connect.class);
        startActivity(intent);
    }
}


