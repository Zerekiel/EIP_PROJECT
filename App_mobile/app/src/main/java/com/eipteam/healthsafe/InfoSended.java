package com.eipteam.healthsafe;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.eipteam.healthsafe.network.MyJSONReq;
import com.eipteam.healthsafe.nfc_manager.nfc_utils.NfcFunctions;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Response;

public class InfoSended extends Activity {
    private HashMap<String, String> map;
    private HashMap<String, String> defaultmap;
    private Integer code = -2;
    private String message;
    private String url;
    private String id = "test";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_send_info);

        Intent intent = getIntent();
        String datas = intent.getStringExtra("data");

        map = NfcFunctions.stringToMap(datas);
        defaultmap = map;

        JSONObject postData = new JSONObject();
        try {
            for (String s : map.keySet()) {
                postData.put(s, map.get(s));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        url = getResources().getString(R.string.stock);

        try {
            postRequest(postData);
        } catch (IOException e) {
            e.printStackTrace();
        }

        while (code == -2);

        if (code == 200) {
            id = message;
        }
    }

    public void backInfo(View v) {
        code = -2;

        JSONObject postData = new JSONObject();
        try {
            postData.put("ID", id);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        url = getResources().getString(R.string.back);

        try {
            postRequest(postData);
        } catch (IOException e) {
            e.printStackTrace();
        }

        while (code == -2);

        if (code == 200) {
            map = NfcFunctions.stringToMap(message);

            Integer nb = 0;

            for (String key : map.keySet()) {
                for (String dKey : defaultmap.keySet()) {
                    if (dKey == key && !map.get(key).equals(defaultmap.get(dKey))) {
                        nb += 1;
                    }
                }
            }

            if (nb == 0) {
                Toast.makeText(this, "You have not changed anything.", Toast.LENGTH_SHORT).show();
                finish();
            }

            transfertInfos();
            finish();
        }
    }

    private void transfertInfos() {
        Intent intent = new Intent(this, TransferData.class);

        intent.putExtra("Infos", NfcFunctions.mapToString(map));

        startActivity(intent);
    }

    public void postRequest(JSONObject postData) throws IOException {
        OkHttpClient client = new OkHttpClient();

        client.newCall(new MyJSONReq().postRequest(url, postData)).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                code = -1;
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                code = response.code();
                message = response.message();
            }
        });
    }

    public void retour(View v){
        code = -2;

        JSONObject postData = new JSONObject();
        try {
            postData.put("ID", id);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        url = getResources().getString(R.string.delete);

        try {
            postRequest(postData);
        } catch (IOException e) {
            e.printStackTrace();
        }

        while (code == -2);

        finish();
    }
}
