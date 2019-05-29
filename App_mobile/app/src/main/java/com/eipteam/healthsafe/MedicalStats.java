package com.eipteam.healthsafe;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ListView;

import com.eipteam.healthsafe.nfc_manager.display.Element;
import com.eipteam.healthsafe.nfc_manager.display.ListElementAdapter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class MedicalStats extends AppCompatActivity {

    private final ArrayList<Element> infos = new ArrayList<>();
    private ListElementAdapter adpInfos;
    private ListView listInfos;
    private HashMap<String, String> map;
    private HashMap<String, String> defaultMap;
    private String[] keys;
    private String[] displayInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_medical_stats);

        listInfos = findViewById(R.id.listInfo);

        keys = getResources().getStringArray(R.array.medical_informations);
        displayInfo = getResources().getStringArray(R.array.explicit_informations);

        Intent intent = getIntent();
        String datas = intent.getStringExtra("data");

        if (!checkData(datas)) {
            Intent tmpIntent = new Intent(this, TransferData.class);

            tmpIntent.putExtra("Infos", "NULL");
            TransferData.error(this, "Not good format.");

            map = new HashMap<>();
            for (String s : getResources().getStringArray(R.array.medical_informations)) {
                map.put(s, "N/A");
            }

            startActivity(tmpIntent);
        } else
            map = TransferData.stringToMap(datas);

        defaultMap = map;

        for (int i = 0; i < keys.length; i++) {
            infos.add(new Element(displayInfo[i], map.get(keys[i])));
        }

        adpInfos = new ListElementAdapter(this, infos);
        listInfos.setAdapter(adpInfos);
    }

    public void returnConnect(View view) {
        finish();
    }

    public void transfer(View v) {

        adpInfos.notifyDataSetChanged();

        int nbSame = 0;

        for (Element e : infos) {
            if (defaultMap.get(getKeysId(e.getText())).equals(e.getEdit()) || (defaultMap.get(getKeysId(e.getText())).equals("N/A") && e.getEdit().equals("")))
                nbSame += 1;
            else {
                if (e.getEdit().equals(""))
                    map.put(getKeysId(e.getText()), "N/A");
                else
                    map.put(getKeysId(e.getText()), e.getEdit());
            }
        }

        if (nbSame == infos.size()) {
            TransferData.error(this, "You have not change anything.");
            return ;
        }

        Intent intent = new Intent(this, TransferData.class);

        intent.putExtra("Infos", TransferData.mapToString(map));

        startActivity(intent);
    }

    private String getKeysId(String key) {
        for (int i = 0; i < displayInfo.length; i++) {
            if (displayInfo[i].equals(key))
                return keys[i];
        }
        return "hellolololo";
    }

    private boolean checkData(String datas) {
        if (!datas.contains("\n"))
            return false;

        String[] records = datas.split("\n");

        ArrayList<String> tmp = new ArrayList<>();

        tmp.addAll(Arrays.asList(keys));

        for (String rec : records) {
            if (!rec.contains(":"))
                return false;
            if (!tmp.contains(rec.split(":")[0]))
                return false;
        }

        return true;
    }
}