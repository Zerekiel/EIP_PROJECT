package com.example.cleme.app_eip;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class Infos_medicales extends AppCompatActivity {

    private TextView data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_infos_medicales);

        data = findViewById(R.id.infos);

        Intent intent = getIntent();
        String datas = intent.getStringExtra("data");

        String[] Tags = datas.split("\n");

        data.setText("");

        for (String tag : Tags) { ;
            data.append(tag + "\n");
        }
    }

    public void return_connect(View view)
    {
        finish();
        return ;
    }
}


