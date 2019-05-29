package com.eipteam.healthsafe;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ListView;
import android.widget.TextView;

import com.eipteam.healthsafe.nfc_manager.display.Element;
import com.eipteam.healthsafe.nfc_manager.display.ListElementAdapter;

import java.util.ArrayList;
import java.util.HashMap;

public class MedicalStats extends AppCompatActivity {

    private final ArrayList<Element> infos = new ArrayList<>();
    private ListElementAdapter adpInfos;
    private ListView listInfos;
    private HashMap<String, String> map;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_medical_stats);

        listInfos = findViewById(R.id.listInfo);

        Intent intent = getIntent();
        String datas = intent.getStringExtra("data");

        map = AddData.stringToMap(datas);

        String[] keys = getResources().getStringArray(R.array.medical_informations);
        String[] displayInfo = getResources().getStringArray(R.array.explicit_informations);

        for (int i = 0; i < keys.length; i++) {
            infos.add(new Element(displayInfo[i], map.get(keys[i])));
        }

        adpInfos =new ListElementAdapter(this, infos);
        listInfos.setAdapter(adpInfos);
    }

    public void returnConnect(View view) {
        finish();
    }

    public void setup(View v) {
        Intent intent = new Intent(this, AddData.class);

        intent.putExtra("Infos", AddData.mapToString(map));

        startActivity(intent);
    }
}