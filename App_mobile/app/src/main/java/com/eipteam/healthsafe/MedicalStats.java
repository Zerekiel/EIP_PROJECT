package com.eipteam.healthsafe;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MedicalStats extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        TextView data;
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_medical_stats);

        data = findViewById(R.id.infos);

        Intent intent = getIntent();
        String datas = intent.getStringExtra("data");

        String[] Tags = datas.split("\n");

        data.setText("");

        for (String tag : Tags) { ;
            data.append(tag + "\n");
        }
    }

    public void returnConnect(View view) {
        finish();
    }

    public void setup(View v) {
        startActivity(new Intent(this, AddData.class));
    }
}