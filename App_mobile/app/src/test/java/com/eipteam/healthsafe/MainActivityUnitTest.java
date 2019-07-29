package com.eipteam.healthsafe;


import android.app.Application;
import android.arch.lifecycle.ReportFragment;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import junit.framework.TestCase;

import org.junit.Before;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.shadows.ShadowActivity;
import org.robolectric.shadows.ShadowIntent;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.spy;
import static org.powermock.configuration.ConfigurationType.PowerMock;
import static org.robolectric.Shadows.shadowOf;


@RunWith(RobolectricTestRunner.class)
@PrepareForTest({ ReportFragment.class })
public class MainActivityUnitTest extends TestCase {
  private Application context;
  private MainActivity ma;
  private ChooseDisplay cd;

    @Before
    public void setUp() throws Exception
    {
        ma = Robolectric.buildActivity(MainActivity.class)
                .create()
                .resume()
                .get();
        cd = Robolectric.buildActivity(ChooseDisplay.class)
                .create()
                .resume()
                .get();
    }

    @Test
    public void testOnCreate() {
        MainActivity spyma = spy(new MainActivity());
        Button btn = (Button) ma.findViewById(R.id.connexion);
        assertNotNull(ma);
        btn.getAccessibilityClassName();
        int id = btn.getId();
        assertEquals(R.id.connexion, id);
        }

    @Test()
    public void testConnection() {
        Bundle b = new Bundle();
        PersistableBundle pb = new PersistableBundle();
        ma.onSaveInstanceState(b, pb);
        assertNotNull(ma);

        }
}
