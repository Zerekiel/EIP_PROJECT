package com.example.cleme.app_eip;

import android.app.PendingIntent;
import android.content.Intent;
import android.nfc.NfcAdapter;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;
import com.example.cleme.app_eip.nfc_deal.main_nfc;

public class nfc_connect extends AppCompatActivity {
    public main_nfc co;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = new Intent(this, choisir_plateforme.class);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nfc_connect);
        co.text = (TextView) findViewById(R.id.text);
        co.nfcAdapter = NfcAdapter.getDefaultAdapter(this);

        if (co.nfcAdapter == null) {
            Toast.makeText(this, "No NFC", Toast.LENGTH_SHORT).show();
            finish();
            return ;
        }

        co.pendingIntent = PendingIntent.getActivity(this, 0,
                new Intent(this, this.getClass())
                        .addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0);

        co.resolveIntent(intent);
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (co.nfcAdapter != null) {
            if (!co.nfcAdapter.isEnabled())
                co.showWirelessSettings();

            co.nfcAdapter.enableForegroundDispatch(this, co.pendingIntent, null, null);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (co.nfcAdapter != null)
            co.nfcAdapter.disableForegroundDispatch(this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        setIntent(intent);
        co.resolveIntent(intent);
    }


    public void deconection(View view)
    {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}
