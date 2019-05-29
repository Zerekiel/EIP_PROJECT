package com.eipteam.healthsafe;

import android.arch.lifecycle.ReportFragment;

import junit.framework.TestCase;

import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.spy;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ReportFragment.class })
public class MainActivityUnitTest extends TestCase {
    @Test
    public void testOnCreate() throws Exception {
        PowerMockito.mockStatic(ReportFragment.class);
//        mockStatic(MainActivity.class);
        MainActivity ma = spy(new MainActivity());
        doNothing().when(ma).setContentView(R.layout.activity_main);

        ma.onCreate(null);
        verify(ma, times(1)).setContentView(R.layout.activity_main);
    }
}
